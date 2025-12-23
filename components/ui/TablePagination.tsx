/**
 * TablePagination - Componente de paginación para tablas
 * 
 * Patrón de diseño: Controlled Component Pattern
 * - Estado de paginación controlado desde el padre
 * - Callbacks para cambios de página y tamaño
 * 
 * Características:
 * - Navegación anterior/siguiente
 * - Selector de tamaño de página
 * - Información de registros mostrados
 * - Responsive design
 * - Animaciones suaves
 * 
 * @component
 * @example
 * ```tsx
 * <TablePagination
 *   pagination={{ page: 1, pageSize: 10, totalItems: 100 }}
 *   onPageChange={handlePageChange}
 *   onPageSizeChange={handlePageSizeChange}
 * />
 * ```
 */

"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PaginationConfig } from "@/lib/contractsService";

interface TablePaginationProps {
  pagination: PaginationConfig;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  className?: string;
}

/**
 * Componente de paginación
 */
export function TablePagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  totalPages,
  hasNextPage,
  hasPrevPage,
  className = "",
}: TablePaginationProps) {
  const { page, pageSize, totalItems } = pagination;
  
  // Calcular rango de elementos mostrados
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  /**
   * Genera números de página para mostrar
   */
  const getPageNumbers = () => {
    const delta = 2; // Páginas a mostrar antes y después de la actual
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para páginas con ellipsis
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - delta; i <= page + delta; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Información de registros */}
      <div className="text-sm text-foreground-muted">
        Mostrando{" "}
        <span className="font-medium text-foreground">
          {startItem}-{endItem}
        </span>{" "}
        de{" "}
        <span className="font-medium text-foreground">{totalItems}</span>{" "}
        contratos
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center gap-2">
        {/* Selector de tamaño de página */}
        <div className="flex items-center gap-2 mr-4">
          <span className="text-sm text-foreground-muted">Mostrar:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 border border-border rounded bg-background-light text-foreground text-sm focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Botones de navegación */}
        <div className="flex items-center gap-1">
          {/* Primera página */}
          <motion.button
            onClick={() => onPageChange(1)}
            disabled={!hasPrevPage}
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-background-card rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: hasPrevPage ? 1.05 : 1 }}
            whileTap={{ scale: hasPrevPage ? 0.95 : 1 }}
          >
            <ChevronsLeft className="w-4 h-4" />
          </motion.button>

          {/* Página anterior */}
          <motion.button
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrevPage}
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-background-card rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: hasPrevPage ? 1.05 : 1 }}
            whileTap={{ scale: hasPrevPage ? 0.95 : 1 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          {/* Números de página */}
          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((pageNum, index) => (
              <motion.button
                key={`${pageNum}-${index}`}
                onClick={() => typeof pageNum === 'number' ? onPageChange(pageNum) : undefined}
                disabled={pageNum === '...'}
                className={`px-3 py-1 min-w-10 text-sm rounded transition-colors ${
                  pageNum === page
                    ? 'bg-accent-cyan text-white'
                    : pageNum === '...'
                    ? 'text-foreground-muted cursor-default'
                    : 'text-foreground-muted hover:text-foreground hover:bg-background-card'
                }`}
                whileHover={{ scale: pageNum !== '...' && pageNum !== page ? 1.05 : 1 }}
                whileTap={{ scale: pageNum !== '...' && pageNum !== page ? 0.95 : 1 }}
              >
                {pageNum}
              </motion.button>
            ))}
          </div>

          {/* En móvil, solo mostrar página actual */}
          <div className="sm:hidden px-3 py-1 text-sm text-foreground bg-background-card rounded border border-border">
            {page} de {totalPages}
          </div>

          {/* Página siguiente */}
          <motion.button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-background-card rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: hasNextPage ? 1.05 : 1 }}
            whileTap={{ scale: hasNextPage ? 0.95 : 1 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* Última página */}
          <motion.button
            onClick={() => onPageChange(totalPages)}
            disabled={!hasNextPage}
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-background-card rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: hasNextPage ? 1.05 : 1 }}
            whileTap={{ scale: hasNextPage ? 0.95 : 1 }}
          >
            <ChevronsRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}