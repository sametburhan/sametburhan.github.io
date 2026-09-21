import sys
import os
import fitz  # PyMuPDF
from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, 
    QPushButton, QFileDialog, QListWidget, QListWidgetItem, 
    QAbstractItemView, QMessageBox
)
from PyQt6.QtGui import QIcon, QImage, QPixmap, QPainter, QColor, QFont, QPen
from PyQt6.QtCore import QSize, Qt, QRect, QTimer


def resource_path(relative_path):
    """
    Hem normal 'python main.py' ile çalıştırırken hem de PyInstaller ile
    tek dosya (--onefile) .exe'ye paketlendiğinde ikon/asset gibi ek
    dosyaları doğru yoldan bulmayı sağlar. PyInstaller onefile modunda
    programı çalıştırırken tüm ek dosyaları geçici bir klasöre (sys._MEIPASS)
    açar; script olarak çalışırken ise böyle bir öznitelik olmadığından
    dosyanın bulunduğu klasörü kullanır.
    """
    base_path = getattr(sys, "_MEIPASS", os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)

# ================= MODERN QSS =================
MODERN_STYLE = """
QWidget { background-color: #121212; color: #E0E0E0; font-family: 'Segoe UI', sans-serif; font-size: 13px; }
QListWidget { background-color: transparent; border: 2px solid #2A2A2A; border-radius: 10px; outline: none; }
QListWidget::item { background-color: #1E1E1E; border: 2px solid #333333; border-radius: 8px; padding: 5px; }
QListWidget::item:hover { background-color: #2D2D30; border: 2px solid #555555; }
QListWidget::item:selected { background-color: #252526; border: 2px solid #3B82F6; color: white; }

QPushButton { border: none; border-radius: 6px; padding: 10px 20px; font-weight: 600; }
QPushButton#btn_add { background-color: #3B82F6; color: white; }
QPushButton#btn_add:hover { background-color: #2563EB; }
QPushButton#btn_delete { background-color: #EF4444; color: white; }
QPushButton#btn_delete:hover { background-color: #DC2626; }
QPushButton#btn_clear { background-color: #374151; color: white; }
QPushButton#btn_clear:hover { background-color: #4B5563; }
QPushButton#btn_save { background-color: #10B981; color: white; }
QPushButton#btn_save:hover { background-color: #059669; }
QScrollBar:vertical { border: none; background: #121212; width: 10px; margin: 0px; }
QScrollBar::handle:vertical { background: #424242; border-radius: 5px; }
QScrollBar::handle:vertical:hover { background: #555555; }
"""
# ==============================================

class PdfDropListWidget(QListWidget):
    def __init__(self):
        super().__init__()
        # Qt'nin doğal İkon Modu'nu kullanıyoruz. Bu sayede sürükle-bırak kusursuz çalışır.
        self.setViewMode(QListWidget.ViewMode.IconMode)
        
        # İçerideki sayfaların birbiriyle yer değiştirmesine izin ver
        self.setDragDropMode(QAbstractItemView.DragDropMode.InternalMove)
        self.setDefaultDropAction(Qt.DropAction.MoveAction)
        self.setSelectionMode(QAbstractItemView.SelectionMode.ExtendedSelection)
        self.setAcceptDrops(True)
        
        # Sayfalar pencere büyüyüp küçüldükçe otomatik sıralansın
        self.setResizeMode(QListWidget.ResizeMode.Adjust)

        # Izgara (Grid) ve Sayfa (Icon) Boyutları
        self.setGridSize(QSize(170, 240))
        self.setIconSize(QSize(140, 180))
        self.setUniformItemSizes(True)

        self.palette = [
            "#EF4444", "#3B82F6", "#10B981", "#F59E0B", 
            "#8B5CF6", "#06B6D4", "#EC4899"
        ]
        self.file_color_map = {} 
        self.file_counter = 1

    def paintEvent(self, event):
        # 1. ARKA PLANA IZGARA (BLOK) ÇİZİMİ - SADECE İÇİNDE SAYFA OLAN HÜCRELER İÇİN
        painter = QPainter(self.viewport())
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        
        # Liste boşsa hiçbir ızgara çizilmez; sadece dolu hücrelerin arkasına çizilir.
        # NOT: Konumu kendimiz (index // cols) hesaplamak yerine Qt'nin
        # visualItemRect() fonksiyonunu kullanıyoruz — bu, scroll (kaydırma)
        # pozisyonunu otomatik olarak hesaba katar ve öğenin GERÇEK ekran
        # konumunu verir. Elle hesaplama, aşağı kaydırıldığında ızgaraların
        # gerçek sayfa ikonlarıyla hizasının bozulmasına sebep oluyordu.
        if self.count() > 0:
            pen = QPen(QColor("#333333"), 2, Qt.PenStyle.DashLine)
            painter.setPen(pen)
            
            for index in range(self.count()):
                item = self.item(index)
                rect = self.visualItemRect(item)
                if not rect.isValid():
                    continue
                inset_rect = rect.adjusted(10, 10, -10, -10)
                painter.drawRoundedRect(inset_rect, 10, 10)

        # 2. LİSTE BOŞSA YÖNLENDİRME METNİ YAZ
        if self.count() == 0:
            painter.setPen(QColor("#777777"))
            font = QFont("Segoe UI", 14, QFont.Weight.Bold)
            painter.setFont(font)
            painter.drawText(self.viewport().rect(), Qt.AlignmentFlag.AlignCenter, 
                             "📄\nPDF dosyalarını buraya sürükleyin\nveya '+ PDF Ekle' butonunu kullanın")
                             
        painter.end()
        
        # 3. SAYFALARIN VE SÜRÜKLEME EFEKTLERİNİN ÇİZİLMESİ İÇİN ORİJİNAL FONKSİYONU ÇAĞIR
        super().paintEvent(event)

    # --- SÜRÜKLE BIRAK (DRAG & DROP) OLAYLARI ---
    def dragEnterEvent(self, event):
        # Dışarıdan Windows/Mac dosyası geliyorsa kabul et
        if event.mimeData().hasUrls():
            event.accept()
        else:
            # Liste içi sayfa taşıma: Qt'nin varsayılan mekanizmasına
            # bırakmıyoruz çünkü öğelerin (ItemIsDropEnabled olmadığı için)
            # ÜZERİNE bırakmayı reddediyor, sadece boş alana izin veriyor.
            # Konum mantığını zaten kendimiz dropEvent'te yönetiyoruz,
            # o yüzden burada her zaman kabul ediyoruz.
            event.accept()

    def dragMoveEvent(self, event):
        if event.mimeData().hasUrls():
            event.accept()
        else:
            # Aynı sebeple: bir öğenin tam üzerindeyken de sürüklemeye
            # izin ver, yoksa dropEvent hiç tetiklenmiyor.
            event.accept()

    def dropEvent(self, event):
        # Dışarıdan dosya bırakıldıysa
        if event.mimeData().hasUrls():
            for url in event.mimeData().urls():
                file_path = url.toLocalFile()
                if file_path.lower().endswith('.pdf'):
                    self.load_pdf_pages(file_path)
            event.accept()
        else:
            # İçerideki sayfa taşıma: Qt'nin varsayılan "serbest konumlandırma"
            # davranışı yerine, sıralı (sequential) kaydırma yapan kendi
            # mantığımızı uyguluyoruz. Böylece 2. sayfa 4'e sürüklenirse,
            # eski 3. ve 4. sayfalar geri kayarak yeni 2. ve 3. sayfa olur.
            self.reorder_dropped_items(event)
            # ÖNEMLİ: Taşımayı zaten kendimiz (manuel) yaptık. Eğer burada
            # normal şekilde accept() dersek, Qt bunu "MoveAction başarılı
            # oldu" olarak algılayıp sürüklemeyi başlatan tarafta EK BİR
            # otomatik satır silme işlemi daha yapıyor (QAbstractItemView'in
            # dahili davranışı). Bu da ya sayfanın yanlışlıkla silinmesine
            # ya da taşımanın "çalışmıyormuş" gibi görünmesine yol açıyordu.
            # IgnoreAction ile işaretleyerek bu otomatik/ikinci silmeyi
            # engelliyoruz.
            event.setDropAction(Qt.DropAction.IgnoreAction)
            event.accept()

    def reorder_dropped_items(self, event):
        selected_rows = sorted(self.row(item) for item in self.selectedItems())
        if not selected_rows:
            return

        drop_pos = event.position().toPoint()
        target_item = self.itemAt(drop_pos)

        # Bırakılan yerde bir öğe varsa onun sırasına, yoksa (boşluğa
        # bırakılırsa) listenin sonuna taşı.
        if target_item is not None:
            target_row = self.row(target_item)
        else:
            target_row = self.count()

        # Taşınacak öğelerin verilerini (ikon + orijinal sayfa bilgisi) sırayla al
        moved_data = []
        for row in selected_rows:
            item = self.item(row)
            moved_data.append((item.icon(), item.data(Qt.ItemDataRole.UserRole)))

        # Öğeleri listeden çıkar (indeksler bozulmasın diye sondan başa doğru)
        for row in reversed(selected_rows):
            self.takeItem(row)

        # Hedef indeksi OLDUĞU GİBİ (çıkarmadan önceki ham hâliyle) kullan.
        # Örnek: 3. sayfayı 8'e sürüklüyorsan, 3 çıkarılınca 4-8 arası
        # sayfalar zaten bir geri kayıyor; 3'ü tam olarak 8'in eski
        # (ham) indeksine eklemek, onu 8'in eski yerine oturtuyor ve
        # eski 8, bir öncekine (7'ye) kaymış oluyor — istenen davranış bu.
        insert_row = target_row
        insert_row = max(0, min(insert_row, self.count()))

        # Öğeleri hedef konuma sırayla geri ekle (arada kalanlar otomatik kayar)
        for offset, (icon, data) in enumerate(moved_data):
            item = QListWidgetItem(icon, "")
            item.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
            item.setData(Qt.ItemDataRole.UserRole, data)
            self.insertItem(insert_row + offset, item)

        # Taşınan öğeleri tekrar seçili yap
        self.clearSelection()
        for offset in range(len(moved_data)):
            new_item = self.item(insert_row + offset)
            if new_item is not None:
                new_item.setSelected(True)

        self.update_sequence_numbers()

    def load_pdf_pages(self, pdf_path):
        try:
            if pdf_path not in self.file_color_map:
                color = self.palette[(self.file_counter - 1) % len(self.palette)]
                self.file_color_map[pdf_path] = (color, self.file_counter)
                self.file_counter += 1
                
            doc_color, doc_num = self.file_color_map[pdf_path]
            doc = fitz.open(pdf_path)
            
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                pix = page.get_pixmap(matrix=fitz.Matrix(0.25, 0.25))
                
                img = QImage(pix.samples, pix.width, pix.height, pix.stride, QImage.Format.Format_RGB888)
                base_pixmap = QPixmap.fromImage(img)
                
                canvas = QPixmap(base_pixmap.size())
                canvas.fill(Qt.GlobalColor.transparent)
                
                painter = QPainter(canvas)
                painter.drawPixmap(0, 0, base_pixmap)
                
                pen = QPen(QColor(doc_color))
                pen.setWidth(10)
                painter.setPen(pen)
                painter.drawRect(canvas.rect())
                
                tag_width = 70
                tag_height = 25
                painter.fillRect(0, 0, tag_width, tag_height, QColor(doc_color))
                painter.setPen(QColor("white"))
                font = QFont("Segoe UI", 10, QFont.Weight.Bold)
                painter.setFont(font)
                painter.drawText(QRect(0, 0, tag_width, tag_height), Qt.AlignmentFlag.AlignCenter, f"Dosya {doc_num}")
                painter.end()
                
                icon = QIcon(canvas)
                item = QListWidgetItem(icon, "")
                item.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
                item.setData(Qt.ItemDataRole.UserRole, (pdf_path, page_num))
                self.addItem(item)
                
            doc.close()
            self.update_sequence_numbers()
            
        except Exception as e:
            print(f"Hata: {e}")

    def update_sequence_numbers(self):
        for index in range(self.count()):
            item = self.item(index)
            pdf_path, orig_page = item.data(Qt.ItemDataRole.UserRole)
            
            file_name = os.path.basename(pdf_path)
            name_without_ext = os.path.splitext(file_name)[0]
            
            if len(name_without_ext) > 10:
                short_name = name_without_ext[:8] + ".."
            else:
                short_name = name_without_ext
                
            new_order = index + 1
            item.setText(f"Sıra: {new_order}\n{short_name} syf: {orig_page + 1}")

    def keyPressEvent(self, event):
        if event.key() == Qt.Key.Key_Delete:
            for item in self.selectedItems():
                self.takeItem(self.row(item))
            self.update_sequence_numbers()
        else:
            super().keyPressEvent(event)
            
    def clear(self):
        super().clear()
        self.file_color_map.clear()
        self.file_counter = 1


class PdfEditorWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PDF Stüdyo - Akıllı Birleştirici")
        self.resize(1000, 700)
        
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(20, 20, 20, 20)
        main_layout.setSpacing(20)
        
        self.list_widget = PdfDropListWidget()
        main_layout.addWidget(self.list_widget)
        
        button_layout = QHBoxLayout()
        button_layout.setSpacing(10)
        
        self.btn_add = QPushButton("+ PDF Ekle")
        self.btn_add.setObjectName("btn_add")
        self.btn_add.clicked.connect(self.add_pdf_dialog)
        
        self.btn_delete = QPushButton("Seçileni Sil")
        self.btn_delete.setObjectName("btn_delete")
        self.btn_delete.clicked.connect(self.delete_selected_pages)
        
        self.btn_clear = QPushButton("Tümünü Temizle")
        self.btn_clear.setObjectName("btn_clear")
        self.btn_clear.clicked.connect(self.list_widget.clear)
        
        self.btn_save = QPushButton("✦ Belgeyi Oluştur")
        self.btn_save.setObjectName("btn_save")
        self.btn_save.setMinimumWidth(180)
        self.btn_save.clicked.connect(self.save_pdf)
        
        button_layout.addWidget(self.btn_add)
        button_layout.addWidget(self.btn_delete)
        button_layout.addWidget(self.btn_clear)
        button_layout.addStretch()
        button_layout.addWidget(self.btn_save)
        
        main_layout.addLayout(button_layout)

    def add_pdf_dialog(self):
        file_paths, _ = QFileDialog.getOpenFileNames(
            self, "PDF Dosyalarını Seç", "", "PDF Dosyaları (*.pdf)"
        )
        if file_paths:
            for file_path in file_paths:
                self.list_widget.load_pdf_pages(file_path)

    def delete_selected_pages(self):
        for item in self.list_widget.selectedItems():
            self.list_widget.takeItem(self.list_widget.row(item))
        self.list_widget.update_sequence_numbers()

    def show_success_message(self, title, text):
        # Varsayılan mavi "i" bilgi simgesi yerine, kendi yeşil onay
        # (checkmark) ikonumuzu kullanan özel bir mesaj kutusu.
        msg_box = QMessageBox(self)
        msg_box.setWindowTitle(title)
        msg_box.setText(text)

        icon_path = resource_path("success_icon.png")
        if os.path.exists(icon_path):
            pixmap = QPixmap(icon_path).scaled(
                64, 64,
                Qt.AspectRatioMode.KeepAspectRatio,
                Qt.TransformationMode.SmoothTransformation
            )
            msg_box.setIconPixmap(pixmap)
        else:
            msg_box.setIcon(QMessageBox.Icon.Information)

        msg_box.exec()

    def save_pdf(self):
        if self.list_widget.count() == 0:
            QMessageBox.warning(self, "Uyarı", "Dışa aktarılacak sayfa bulunamadı!")
            return
            
        output_path, _ = QFileDialog.getSaveFileName(self, "PDF Kaydet", "", "PDF Dosyaları (*.pdf)")
        
        if not output_path:
            return
            
        try:
            merged_pdf = fitz.open()
            open_docs = {}
            
            for index in range(self.list_widget.count()):
                item = self.list_widget.item(index)
                pdf_path, page_num = item.data(Qt.ItemDataRole.UserRole)
                
                if pdf_path not in open_docs:
                    open_docs[pdf_path] = fitz.open(pdf_path)
                    
                src_doc = open_docs[pdf_path]
                merged_pdf.insert_pdf(src_doc, from_page=page_num, to_page=page_num)
                
            merged_pdf.save(output_path, garbage=4, deflate=True)
            merged_pdf.close()
            
            for doc in open_docs.values():
                doc.close()
                
            self.show_success_message("Başarılı", "PDF başarıyla oluşturuldu!")
            
        except Exception as e:
            QMessageBox.critical(self, "Hata", f"İşlem başarısız:\n{str(e)}")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyleSheet(MODERN_STYLE)

    # İkon dosyasını (varsa) uygula. Aynı klasöre "icon.ico" adıyla bir
    # dosya koyman yeterli — hem geliştirme sırasında hem de derlenmiş
    # .exe içinde otomatik bulunur.
    icon_path = resource_path("icon.ico")
    if os.path.exists(icon_path):
        app_icon = QIcon(icon_path)
        app.setWindowIcon(app_icon)

    window = PdfEditorWindow()
    if os.path.exists(icon_path):
        window.setWindowIcon(app_icon)
    window.show()
    sys.exit(app.exec())