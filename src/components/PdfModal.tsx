interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function PdfModal({ isOpen, onClose, pdfUrl }: PdfModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] h-[90%] rounded shadow-lg overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-2 bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm"
        >
          닫기
        </button>
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}
