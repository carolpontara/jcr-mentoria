// src/app/components/PdfViewer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// ✅ Garante que o worker use a MESMA versão do pdfjs em tempo de execução
// (evita "API version X != Worker version Y")
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  src: string;
  className?: string;
};

export default function PdfViewer({ src, className }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [modeAll, setModeAll] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerWidth(Math.min(el.clientWidth - 24, 1100));
    });
    ro.observe(el);
    setContainerWidth(Math.min(el.clientWidth - 24, 1100));
    return () => ro.disconnect();
  }, []);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => setNumPages(numPages);
  const dec = () => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)));
  const inc = () => setScale((s) => Math.min(2.0, +(s + 0.1).toFixed(2)));

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border border-[#f0e2e4] bg-white shadow-sm overflow-hidden ${className ?? ""}`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-[#f0e2e4] bg-[#fffafc]">
        <div className="flex items-center gap-2">
          <button onClick={dec} className="rounded-lg px-3 py-2 text-sm border border-[#e9d5d7] hover:bg-[#f7e8ea] transition" aria-label="Diminuir zoom">–</button>
          <span className="text-sm tabular-nums">{Math.round(scale * 100)}%</span>
          <button onClick={inc} className="rounded-lg px-3 py-2 text-sm border border-[#e9d5d7] hover:bg-[#f7e8ea] transition" aria-label="Aumentar zoom">+</button>

          <div className="h-5 w-px bg-[#e9d5d7] mx-2" />
          <button onClick={() => setModeAll(true)} className={`rounded-lg px-3 py-2 text-sm border transition ${modeAll ? "bg-[#f7e8ea] border-[#e9d5d7]" : "border-[#e9d5d7] hover:bg-[#f7e8ea]"}`}>Rolagem</button>
          <button onClick={() => setModeAll(false)} className={`rounded-lg px-3 py-2 text-sm border transition ${!modeAll ? "bg-[#f7e8ea] border-[#e9d5d7]" : "border-[#e9d5d7] hover:bg-[#f7e8ea]"}`}>Página única</button>

          {!modeAll && (
            <>
              <div className="h-5 w-px bg-[#e9d5d7] mx-2" />
              <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))} className="rounded-lg px-3 py-2 text-sm border border-[#e9d5d7] hover:bg-[#f7e8ea] transition">‹ Anterior</button>
              <span className="text-sm tabular-nums">{pageNumber} / {numPages || "–"}</span>
              <button onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))} className="rounded-lg px-3 py-2 text-sm border border-[#e9d5d7] hover:bg-[#f7e8ea] transition">Próxima ›</button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a href={src} target="_blank" rel="noopener noreferrer" className="rounded-xl px-3 py-2 text-sm font-medium shadow-sm hover:shadow transition" style={{ backgroundColor: "#1f1f1f", color: "white" }}>
            Abrir em nova aba
          </a>
          <a href={src} download className="rounded-xl px-3 py-2 text-sm font-medium shadow-sm hover:shadow transition" style={{ backgroundColor: "#F3DCDC", color: "#1f1f1f" }}>
            Baixar PDF
          </a>
        </div>
      </div>

      {/* Viewer */}
      <div className="p-3">
        <Document
          file={src}
          onLoadSuccess={onLoadSuccess}
          loading={<div className="text-sm text-[#6b6b6b]">Carregando apresentação…</div>}
          error={<div className="text-sm text-red-600">Não foi possível carregar o PDF.</div>}
          onLoadError={(e) => console.warn("PDF error:", e)}
        >
          {numPages > 0 &&
            (modeAll ? (
              <div className="flex flex-col items-center gap-6">
                {Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i}
                    pageNumber={i + 1}
                    width={Math.max(320, Math.floor(containerWidth * scale))}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Page
                  pageNumber={pageNumber}
                  width={Math.max(320, Math.floor(containerWidth * scale))}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
        </Document>
      </div>
    </div>
  );
}
