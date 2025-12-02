import React, { useState, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Autocomplete } from '@/components/ui/autocomplete'

// Componente de Tooltip según el diseño
type TooltipProps = {
  children: React.ReactNode
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

function Tooltip({ children, text, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#313336]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-[#313336]',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#313336]',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-4 border-transparent border-r-[#313336]',
  }

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const tooltipHeight = 32 // Altura aproximada del tooltip
      const tooltipWidth = text.length * 7 + 16 // Ancho aproximado basado en el texto
      
      let top = 0
      let left = 0

      switch (position) {
        case 'top':
          top = rect.top - tooltipHeight - 8
          left = rect.left + rect.width / 2
          break
        case 'bottom':
          top = rect.bottom + 8
          left = rect.left + rect.width / 2
          break
        case 'left':
          top = rect.top + rect.height / 2
          left = rect.left - tooltipWidth - 8
          break
        case 'right':
          top = rect.top + rect.height / 2
          left = rect.right + 8
          break
      }

      setTooltipPosition({ top, left })
    }
  }, [isVisible, position, text])

  const tooltipContent = isVisible && (
    <div
      ref={tooltipRef}
      className="fixed"
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
        transform: position === 'top' || position === 'bottom' ? 'translateX(-50%)' : position === 'left' || position === 'right' ? 'translateY(-50%)' : 'none',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <div className="bg-[#313336] px-2 py-1 rounded-[8px] whitespace-nowrap relative">
        <p
          className="text-white text-[12px] font-bold leading-[17.5px] tracking-[0.5px]"
          style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 700, fontVariationSettings: "'wdth' 100" }}
        >
          {text}
        </p>
        <div className={`absolute ${arrowClasses[position]}`} />
      </div>
    </div>
  )

  return (
    <>
      <div
        ref={triggerRef}
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  )
}

// Componente de Checkbox personalizado según variables del diseño
type CustomCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

function CustomCheckbox({ checked, onChange, className = '' }: CustomCheckboxProps) {
  return (
    <div
      className={`flex items-center justify-center cursor-pointer ${className}`}
      onClick={() => onChange(!checked)}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '2px',
          border: '1px solid #c6c8cc',
          backgroundColor: checked ? '#3658c1' : '#ffffff',
          transition: 'all 0.2s ease',
        }}
      >
        {checked && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default function GestionTarifas() {
  const [activeFilter, setActiveFilter] = useState<'sitios-fijos' | 'indoors'>('sitios-fijos')
  const [hoveredCell, setHoveredCell] = useState<{ rowIdx: number; colIdx: number } | null>(null)
  const [selectedCell, setSelectedCell] = useState<{ rowIdx: number; colIdx: number } | null>(null)
  const [disabledCells, setDisabledCells] = useState<Set<string>>(new Set())
  const [focusedCell, setFocusedCell] = useState<{ rowIdx: number; colIdx: number } | null>(null)
  const [editingCells, setEditingCells] = useState<Set<string>>(new Set())
  const [headerHovered, setHeaderHovered] = useState<string | null>(null)
  const [columnLocked, setColumnLocked] = useState<Set<string>>(new Set())
  const [lockedColumnOrder, setLockedColumnOrder] = useState<string[]>([]) // Orden de bloqueo de columnas
  const [columnFiltered, setColumnFiltered] = useState<Set<string>>(new Set())
  const [columnSort, setColumnSort] = useState<Map<string, 'up' | 'down' | null>>(new Map())
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFiltersModal, setShowFiltersModal] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState<Array<{
    id: string
    column: string
    operator: string
    value: string
    value2?: string // Para el operador "entre"
  }>>([])
  const [filterLogic, setFilterLogic] = useState<'AND' | 'OR'>('AND')
  const [selectedColumnForFilter, setSelectedColumnForFilter] = useState<string>('')
  const [openLogicDropdownIndex, setOpenLogicDropdownIndex] = useState<number | null>(null)
  const logicButtonRefs = useRef<Map<number, HTMLButtonElement>>(new Map())
  const logicDropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const configButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const filtersButtonRef = useRef<HTMLButtonElement>(null)
  const filtersDropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    if (!showConfigModal) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        configButtonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !configButtonRef.current.contains(event.target as Node)
      ) {
        setShowConfigModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showConfigModal])

  // Cerrar dropdown de filtros al hacer clic fuera
  useEffect(() => {
    if (!showFiltersModal) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // No cerrar si el clic fue en el dropdown del Autocomplete (renderizado con Portal)
      if (target.closest('[data-autocomplete-dropdown="true"]')) {
        return
      }
      
      // No cerrar si el clic fue en el dropdown de lógica AND/OR
      if (openLogicDropdownIndex !== null) {
        const logicButton = logicButtonRefs.current.get(openLogicDropdownIndex)
        const logicDropdown = logicDropdownRefs.current.get(openLogicDropdownIndex)
        if (logicButton && logicDropdown && (logicButton.contains(target) || logicDropdown.contains(target))) {
          return
        }
      }
      
      if (
        filtersDropdownRef.current &&
        filtersButtonRef.current &&
        !filtersDropdownRef.current.contains(target) &&
        !filtersButtonRef.current.contains(target)
      ) {
        setShowFiltersModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFiltersModal, openLogicDropdownIndex])

  // Cerrar dropdown de lógica AND/OR al hacer clic fuera
  useEffect(() => {
    if (openLogicDropdownIndex === null) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      const logicButton = logicButtonRefs.current.get(openLogicDropdownIndex)
      const logicDropdown = logicDropdownRefs.current.get(openLogicDropdownIndex)
      
      if (
        logicButton &&
        logicDropdown &&
        !logicButton.contains(target) &&
        !logicDropdown.contains(target)
      ) {
        setOpenLogicDropdownIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openLogicDropdownIndex])

  // Prevenir hover del scrollbar aplicando estilos inline
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      *::-webkit-scrollbar-thumb {
        background: #3658C1 !important;
        background-color: #3658C1 !important;
      }
      *::-webkit-scrollbar-thumb:hover {
        background: #3658C1 !important;
        background-color: #3658C1 !important;
      }
      *::-webkit-scrollbar-thumb:active {
        background: #3658C1 !important;
        background-color: #3658C1 !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Datos de ejemplo para la tabla (estado inicial) - usando useMemo para evitar recreación
  const initialTableData = useMemo(() => Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    claveMedio: `IMJ-ZMG-ESP-O-${11594 + i}A`,
    tipoMedio: ['Espectaculares', 'Vallas', 'Mupis', 'Lonas'][i % 4],
    proveedor: ['WESTMEDIA', 'CLEAR CHANNEL', 'JCDECAUX', 'POSTERSCOPE'][i % 4],
    ubicacion: ['GUADALAJARA (ZMG)', 'CDMX', 'MONTERREY', 'PUEBLA'][i % 4],
    latitud: (20.6597 + i * 0.01).toFixed(4),
    longitud: (-103.3496 + i * 0.01).toFixed(4),
    direccion: `Av. López Mateos Sur ${i + 1}`,
    base: String(12 + i),
    altura: String(6 + (i % 3)),
    costoProduccion: `$${(15000 + i * 1000).toLocaleString()}`,
    precioProduccion: `$${(20000 + i * 1000).toLocaleString()}`,
    estatus: i % 3 === 0 ? 'No Disponible' : 'Activo',
    disponibilidad: i % 2 === 0 ? 'Activo' : 'Inactivo',
    calificacionTecnica: (4.0 + (i % 5) * 0.2).toFixed(1),
    calificacionRentabilidad: (3.5 + (i % 6) * 0.2).toFixed(1),
    calificacionProveedor: (3.0 + (i % 7) * 0.2).toFixed(1),
    costoAgencia: `$${(18000 + i * 1000).toLocaleString()}`,
    precioAgencia: `$${(22000 + i * 1000).toLocaleString()}`,
    costoClienteDirecto: `$${(16000 + i * 1000).toLocaleString()}`,
    precioClienteDirecto: `$${(21000 + i * 1000).toLocaleString()}`,
  })), [])

  // Función para calcular margen de ganancia
  const calcularMargenGanancia = (costo: string, precio: string): string => {
    // Extraer números de los strings (remover $ y comas)
    const costoNum = parseFloat(costo.replace(/[$,]/g, ''))
    const precioNum = parseFloat(precio.replace(/[$,]/g, ''))
    
    if (isNaN(costoNum) || isNaN(precioNum) || costoNum === 0) {
      return '0.00%'
    }
    
    // Fórmula: ((precio - costo) / costo) * 100
    const margen = ((precioNum - costoNum) / costoNum) * 100
    return `${margen.toFixed(2)}%`
  }

  // Función para calcular calificación general (ponderado de las 3 calificaciones)
  const calcularCalificacionGeneral = (
    calificacionTecnica: string,
    calificacionRentabilidad: string,
    calificacionProveedor: string
  ): string => {
    const tec = parseFloat(calificacionTecnica) || 0
    const rent = parseFloat(calificacionRentabilidad) || 0
    const prov = parseFloat(calificacionProveedor) || 0
    
    // Promedio simple de las 3 calificaciones
    const promedio = (tec + rent + prov) / 3
    
    // Aplicar mínimo 0 y máximo 5
    const calificacion = Math.max(0, Math.min(5, promedio))
    
    return calificacion.toFixed(1)
  }

  // Función para determinar el tipo de columna
  const getColumnType = (key: string): 'numeric' | 'text' | 'option' => {
    const numericColumns = [
      'latitud', 'longitud', 'base', 'altura',
      'calificacionTecnica', 'calificacionRentabilidad', 'calificacionProveedor',
      'costoProduccion', 'precioProduccion', 'costoAgencia', 'precioAgencia',
      'costoClienteDirecto', 'precioClienteDirecto',
      'margenGananciaCD', 'margenGananciaA', 'calificacionGeneral'
    ]
    const optionColumns = ['estatus', 'disponibilidad']
    
    if (numericColumns.includes(key)) return 'numeric'
    if (optionColumns.includes(key)) return 'option'
    return 'text'
  }

  // Obtener opciones para columnas de tipo "option"
  const getColumnOptions = (key: string): string[] => {
    if (key === 'estatus') return ['Activo', 'No Disponible', 'Inactivo']
    if (key === 'disponibilidad') return ['Activo', 'Inactivo']
    return []
  }

  // Función para generar el texto del tag de filtro
  const getFilterTagText = (filter: typeof advancedFilters[0]): string => {
    const column = allColumns.find(c => c.key === filter.column)
    if (!column || !filter.operator || !filter.value) return ''
    
    const columnName = column.label
    const columnType = getColumnType(filter.column)
    
    // Mapeo de operadores a símbolos/texto según los operadores reales del código
    const operatorMap: Record<string, string> = {
      'equals': '=',
      'notEquals': '≠',
      'contains': 'contiene',
      'startsWith': 'comienza con',
      'endsWith': 'termina con',
      'greater': '>',
      'less': '<',
      'between': 'entre'
    }
    
    const operatorSymbol = operatorMap[filter.operator] || filter.operator
    
    if (filter.operator === 'between' && filter.value2) {
      // Para "entre", mostrar: "columna" entre valor-valor
      if (columnType === 'text') {
        return `"${columnName}" ${operatorSymbol} "${filter.value}"-"${filter.value2}"`
      } else {
        return `"${columnName}" ${operatorSymbol} ${filter.value}-${filter.value2}`
      }
    } else {
      // Para otros operadores
      if (columnType === 'text') {
        return `"${columnName}" ${operatorSymbol} "${filter.value}"`
      } else {
        return `"${columnName}" ${operatorSymbol} ${filter.value}`
      }
    }
  }

  // Operadores por tipo de columna
  const getOperators = (type: 'numeric' | 'text' | 'option') => {
    if (type === 'numeric') {
      return [
        { value: 'equals', label: 'Es igual a' },
        { value: 'greater', label: 'Es mayor que' },
        { value: 'less', label: 'Es menor que' },
        { value: 'between', label: 'Entre' },
        { value: 'notEquals', label: 'Diferente de' }
      ]
    }
    if (type === 'text') {
      return [
        { value: 'contains', label: 'Contiene' },
        { value: 'equals', label: 'Es igual a' },
        { value: 'startsWith', label: 'Comienza con' },
        { value: 'endsWith', label: 'Termina con' },
        { value: 'notEquals', label: 'Diferente de' }
      ]
    }
    // option
    return [
      { value: 'equals', label: 'Es igual a' },
      { value: 'notEquals', label: 'Diferente de' }
    ]
  }

  // Función para extraer valor numérico de strings monetarios
  const extractNumericValue = (value: string | number): number => {
    if (typeof value === 'number') return value
    // Remover símbolos de moneda, comas y espacios
    const cleaned = String(value).replace(/[$,\s]/g, '')
    const num = parseFloat(cleaned)
    return isNaN(num) ? 0 : num
  }

  // Función para determinar si un valor es numérico
  const isNumericColumn = (key: string): boolean => {
    const numericColumns = [
      'latitud', 'longitud', 'base', 'altura',
      'calificacionTecnica', 'calificacionRentabilidad', 'calificacionProveedor',
      'costoProduccion', 'precioProduccion', 'costoAgencia', 'precioAgencia',
      'costoClienteDirecto', 'precioClienteDirecto'
    ]
    return numericColumns.includes(key)
  }

  // Función de comparación para ordenamiento
  const compareValues = (a: any, b: any, key: string, direction: 'up' | 'down'): number => {
    const aValue = a[key]
    const bValue = b[key]

    if (isNumericColumn(key)) {
      const aNum = extractNumericValue(aValue)
      const bNum = extractNumericValue(bValue)
      return direction === 'up' ? aNum - bNum : bNum - aNum
    } else {
      // Ordenamiento alfabético
      const aStr = String(aValue || '').toLowerCase()
      const bStr = String(bValue || '').toLowerCase()
      if (direction === 'up') {
        return aStr.localeCompare(bStr, 'es', { numeric: true, sensitivity: 'base' })
      } else {
        return bStr.localeCompare(aStr, 'es', { numeric: true, sensitivity: 'base' })
      }
    }
  }

  // Estado para los datos de la tabla (permite edición en tiempo real)
  const [tableData, setTableData] = useState(() => initialTableData)

  // Calcular valores de columnas de solo consulta
  const tableDataWithCalculated = useMemo(() => {
    return tableData.map(row => {
      // Calcular margen de ganancia CD (Cliente Directo)
      const margenGananciaCD = calcularMargenGanancia(
        row.costoClienteDirecto,
        row.precioClienteDirecto
      )
      
      // Calcular margen de ganancia A (Agencia)
      const margenGananciaA = calcularMargenGanancia(
        row.costoAgencia,
        row.precioAgencia
      )
      
      // Calcular calificación general
      const calificacionGeneral = calcularCalificacionGeneral(
        row.calificacionTecnica,
        row.calificacionRentabilidad,
        row.calificacionProveedor
      )
      
      return {
        ...row,
        margenGananciaCD,
        margenGananciaA,
        calificacionGeneral
      }
    })
  }, [tableData])

  // Función para aplicar un filtro avanzado a una fila
  const applyAdvancedFilter = (row: typeof initialTableData[0], filter: typeof advancedFilters[0]): boolean => {
    const columnValue = row[filter.column as keyof typeof row]
    const columnType = getColumnType(filter.column)
    
    if (columnType === 'numeric') {
      const rowValue = extractNumericValue(columnValue)
      const filterValue = parseFloat(filter.value)
      const filterValue2 = filter.value2 ? parseFloat(filter.value2) : null
      
      switch (filter.operator) {
        case 'equals':
          return rowValue === filterValue
        case 'greater':
          return rowValue > filterValue
        case 'less':
          return rowValue < filterValue
        case 'between':
          if (filterValue2 === null) return false
          return rowValue >= filterValue && rowValue <= filterValue2
        case 'notEquals':
          return rowValue !== filterValue
        default:
          return true
      }
    }
    
    if (columnType === 'text') {
      const rowValue = String(columnValue || '').toLowerCase()
      const filterValue = filter.value.toLowerCase()
      
      switch (filter.operator) {
        case 'contains':
          return rowValue.includes(filterValue)
        case 'equals':
          return rowValue === filterValue
        case 'startsWith':
          return rowValue.startsWith(filterValue)
        case 'endsWith':
          return rowValue.endsWith(filterValue)
        case 'notEquals':
          return rowValue !== filterValue
        default:
          return true
      }
    }
    
    // option
    const rowValue = String(columnValue || '')
    const filterValue = filter.value
    
    switch (filter.operator) {
      case 'equals':
        return rowValue === filterValue
      case 'notEquals':
        return rowValue !== filterValue
      default:
        return true
    }
  }

  // Función para filtrar datos por término de búsqueda
  const filterTableData = (data: typeof initialTableData, term: string) => {
    if (!term.trim()) return data
    
    const searchLower = term.toLowerCase().trim()
    
    return data.filter((row) => {
      // Buscar en todas las propiedades del objeto
      return Object.values(row).some((value) => {
        if (value === null || value === undefined) return false
        // Convertir a string y buscar
        const stringValue = String(value).toLowerCase()
        return stringValue.includes(searchLower)
      })
    })
  }

  // Función para aplicar filtros avanzados
  const applyAdvancedFilters = (data: typeof initialTableData) => {
    if (advancedFilters.length === 0) {
      // Limpiar indicadores de columnas filtradas
      setColumnFiltered(new Set())
      return data
    }
    
    // Actualizar indicadores de columnas filtradas
    const filteredColumns = new Set(advancedFilters.map(f => f.column))
    setColumnFiltered(filteredColumns)
    
    return data.filter((row) => {
      if (filterLogic === 'AND') {
        // Todas las condiciones deben cumplirse
        return advancedFilters.every(filter => applyAdvancedFilter(row, filter))
      } else {
        // Al menos una condición debe cumplirse
        return advancedFilters.some(filter => applyAdvancedFilter(row, filter))
      }
    })
  }

  // Datos ordenados según el estado de sort
  const sortedTableData = useMemo(() => {
    // Primero filtrar por búsqueda
    let filtered = filterTableData(tableDataWithCalculated, searchTerm)
    
    // Luego aplicar filtros avanzados
    filtered = applyAdvancedFilters(filtered)
    
    // Finalmente ordenar
    const sorted = [...filtered]
    
    // Encontrar la columna activa de sort (solo una columna puede estar ordenada a la vez)
    let activeSortColumn: string | null = null
    let activeSortDirection: 'up' | 'down' | null = null
    
    columnSort.forEach((direction, key) => {
      if (direction !== null) {
        activeSortColumn = key
        activeSortDirection = direction
      }
    })

    if (activeSortColumn && activeSortDirection) {
      sorted.sort((a, b) => compareValues(a, b, activeSortColumn!, activeSortDirection!))
    }

    return sorted
  }, [columnSort, tableData, searchTerm, advancedFilters, filterLogic])

  // Mapeo de iconos del diseño para los headers (diferentes de los iconos de tipo)
  const headerIcons: Record<string, string | null> = {
    'checkbox': null,
    'claveMedio': 'hashtag',
    'tipoMedio': 'billboard',
    'vistaFicha': 'camera',
    'proveedor': 'truck-field-un',
    'ubicacion': 'earth-americas',
    'latitud': 'circle-location-arrow',
    'longitud': 'circle-location-arrow',
    'direccion': 'location-dot',
    'base': 'ruler',
    'altura': 'ruler',
    'costoProduccion': 'circle-dollar',
    'precioProduccion': 'circle-dollar',
    'estatus': 'circle-check',
    'disponibilidad': 'circle-check',
    'calificacionTecnica': 'gear',
    'calificacionRentabilidad': 'chart-mixed-up-circle-dollar',
    'calificacionProveedor': 'star',
    'calificacionGeneral': 'star',
    'costoAgencia': 'circle-dollar',
    'precioAgencia': 'circle-dollar',
    'margenGananciaA': 'money-bill-trend-up',
    'costoClienteDirecto': 'circle-dollar',
    'precioClienteDirecto': 'circle-dollar',
    'margenGananciaCD': 'money-bill-trend-up',
    'edicion': null,
  }

  // Definición de columnas con anchos exactos del diseño
  // Tipo: 'text' | 'numeric' | 'option'
  // NOTA: El campo 'icon' aquí se usa para los iconos del diseño en los headers
  const allColumns = [
    { key: 'checkbox', label: '', width: 50, icon: null, type: 'text' as const },
    { key: 'claveMedio', label: 'CLAVE DEL MEDIO', width: 243, icon: 'text', type: 'text' as const },
    { key: 'tipoMedio', label: 'TIPO DE MEDIO', width: 228, icon: 'list-ul', type: 'option' as const },
    { key: 'vistaFicha', label: 'VISTA FICHA', width: 184, icon: 'camera', type: 'text' as const },
    { key: 'proveedor', label: 'PROVEEDOR', width: 209, icon: 'text', type: 'text' as const },
    { key: 'ubicacion', label: 'UBICACIÓN', width: 213, icon: 'text', type: 'text' as const },
    { key: 'latitud', label: 'LATITUD', width: 159, icon: 'text', type: 'numeric' as const },
    { key: 'longitud', label: 'LONGITUD', width: 159, icon: 'text', type: 'numeric' as const },
    { key: 'direccion', label: 'DIRECCIÓN', width: 213, icon: 'text', type: 'text' as const },
    { key: 'base', label: 'BASE', width: 142, icon: 'hashtag', type: 'numeric' as const },
    { key: 'altura', label: 'ALTURA', width: 124, icon: 'hashtag', type: 'numeric' as const },
    { key: 'costoProduccion', label: 'COSTO PRODUCCIÓN', width: 221, icon: 'hashtag', type: 'numeric' as const },
    { key: 'precioProduccion', label: 'PRECIO PRODUCCIÓN', width: 221, icon: 'hashtag', type: 'numeric' as const },
    { key: 'estatus', label: 'ESTATUS', width: 178, icon: 'list-ul', type: 'option' as const },
    { key: 'disponibilidad', label: 'DISPONIBILIDAD', width: 178, icon: 'list-ul', type: 'option' as const },
    { key: 'calificacionTecnica', label: 'CALIFICACIÓN TÉCNICA', width: 255, icon: 'star', type: 'numeric' as const },
    { key: 'calificacionRentabilidad', label: 'CALIFICACIÓN RENTABILIDAD', width: 311, icon: 'star', type: 'numeric' as const },
    { key: 'calificacionProveedor', label: 'CALIFICACIÓN PROVEEDOR', width: 280, icon: 'star', type: 'numeric' as const },
    { key: 'calificacionGeneral', label: 'CALIFICACIÓN GENERAL', width: 280, icon: 'star', type: 'numeric' as const },
    { key: 'costoAgencia', label: 'COSTO AGENCIA', width: 244, icon: 'hashtag', type: 'numeric' as const },
    { key: 'precioAgencia', label: 'PRECIO AGENCIA', width: 244, icon: 'hashtag', type: 'numeric' as const },
    { key: 'margenGananciaA', label: 'MARGEN DE GANANCIA A', width: 244, icon: 'percent', type: 'numeric' as const },
    { key: 'costoClienteDirecto', label: 'COSTO CLIENTE DIRECTO', width: 262, icon: 'hashtag', type: 'numeric' as const },
    { key: 'precioClienteDirecto', label: 'PRECIO CLIENTE DIRECTO', width: 268, icon: 'hashtag', type: 'numeric' as const },
    { key: 'margenGananciaCD', label: 'MARGEN DE GANANCIA CD', width: 268, icon: 'percent', type: 'numeric' as const },
    { key: 'edicion', label: '', width: 64, icon: null, type: 'text' as const },
  ]

  // Estados para configuración de columnas (deben estar antes del useMemo de columns)
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(allColumns.map(c => c.key)))
  const [columnOrder, setColumnOrder] = useState<string[]>(allColumns.map(c => c.key))
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null)

  // Filtrar y ordenar columnas según configuración
  const columns = useMemo(() => {
    const ordered = columnOrder
      .map(key => allColumns.find(c => c.key === key))
      .filter((col): col is typeof allColumns[0] => col !== undefined && visibleColumns.has(col.key))
    return ordered
  }, [columnOrder, visibleColumns])

  return (
    <div className="flex h-screen bg-[#efefef] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[170px] bg-[#efefef] flex flex-col">
        {/* Logo y botón cerrar */}
        <div className="flex items-center gap-3 p-2">
          <div className="w-11 h-11 bg-blue-regular rounded flex items-center justify-center text-white font-bold">
            obp
          </div>
          <button className="ml-auto w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Separador */}
        <div className="h-px bg-gray-300 mx-2 my-3" />

        {/* Menú items */}
        <div className="flex flex-col gap-2 px-2">
          {['Carrito', 'Mapa', 'Pautado', 'Nueva campaña', 'Listado de campañas', 'Modulo de tareas'].map((item, idx) => (
            <button
              key={idx}
              className={`h-7 px-2 rounded text-left text-xs font-semibold flex items-center gap-2 ${
                item === 'Pautado' ? 'bg-blue-regular text-blue-light' : 'text-primary-custom hover:bg-gray-200'
              }`}
            >
              <span className="w-3.5 h-3.5 bg-gray-400 rounded" />
              {item}
            </button>
          ))}

          {/* Separador */}
          <div className="h-px bg-gray-300 my-2" />

          {/* Catálogo, Inventario, Herramientas */}
          {['Catálogo', 'Inventario', 'Herramientas'].map((item) => (
            <button
              key={item}
              className="h-7 px-2 rounded text-left text-xs font-semibold flex items-center gap-2 text-primary-custom hover:bg-gray-200"
            >
              <span className="w-3.5 h-3.5 bg-gray-400 rounded" />
              {item}
              <svg className="w-3.5 h-3.5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}

          {/* Separador */}
          <div className="h-px bg-gray-300 my-2" />
        </div>

        {/* Usuario */}
        <div className="mt-auto p-2 flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-regular rounded-full" />
          <div className="flex-1">
            <p className="text-xs font-bold text-primary-custom">Juan Almada</p>
            <p className="text-xs text-primary-custom">Admin</p>
          </div>
          <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col bg-[#f7f8fa] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 flex-shrink-0">
          <div className="bg-white rounded-[16px] p-4">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 xl:gap-0 w-full">
              {/* Título e icono */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="bg-[#f1f4fe] rounded-full p-2 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-chart-line text-[#3658c1]" style={{ fontSize: '16px' }}></i>
                </div>
                <h1
                  className="text-[20px] font-semibold leading-[25px] text-[#3b3b3b] tracking-[0px] whitespace-nowrap"
                  style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 600 }}
                >
                  Gestión de Tarifas
                </h1>
              </div>

              {/* Botones de filtro */}
              <div className="bg-[#f0f1f2] flex gap-2 h-12 items-center p-2 rounded-[10px] flex-shrink-0 w-full xl:w-auto justify-center xl:justify-start">
                <button
                  onClick={() => setActiveFilter('sitios-fijos')}
                  className={`h-8 px-4 rounded-[6px] flex items-center gap-2 transition-colors whitespace-nowrap ${
                    activeFilter === 'sitios-fijos'
                      ? 'bg-white text-[#313336]'
                      : 'bg-transparent text-[#585a5e]'
                  }`}
                  style={{
                    fontFamily: 'SF Pro, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '20.5px',
                    letterSpacing: '0.5px',
                  }}
                >
                  <i className="fa-solid fa-billboard" style={{ fontSize: '16px', color: '#4d5054' }}></i>
                  <span>Sitios Fijos</span>
                </button>
                <button
                  onClick={() => setActiveFilter('indoors')}
                  className={`h-8 px-4 rounded-[6px] flex items-center gap-2 transition-colors whitespace-nowrap ${
                    activeFilter === 'indoors'
                      ? 'bg-white text-[#313336]'
                      : 'bg-transparent text-[#585a5e]'
                  }`}
                  style={{
                    fontFamily: 'SF Pro, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '20.5px',
                    letterSpacing: '0.5px',
                  }}
                >
                  <i className="fa-solid fa-house-chimney-user" style={{ fontSize: '16px', color: '#4d5054' }}></i>
                  <span>Indoors</span>
                </button>
              </div>

              {/* Lista de precios */}
              <div
                className="text-[20px] font-semibold leading-[25px] text-white tracking-[0px] whitespace-nowrap flex-shrink-0 w-full xl:w-[192px] text-left xl:text-right"
                style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 600 }}
              >
                Lista de precios
              </div>
              </div>
            </div>
          </div>

          {/* Tabla Container */}
        <div className="flex-1 flex flex-col bg-white mx-4 mb-4 rounded-[16px] min-w-0 overflow-hidden">
          {/* Table Tool Bar */}
          <div className="bg-white px-4 py-4 flex flex-col flex-shrink-0">
            <div className="flex items-center justify-between">
            {/* Acciones izquierda */}
            <div className="flex items-center gap-2">
              {/* Botón configuración */}
              <div className="relative">
                <Tooltip text="Configuración de tabla">
                  <div>
                    <button 
                      ref={configButtonRef}
                      onClick={() => {
                        setShowConfigModal(!showConfigModal)
                      }}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#f0f1f2] rounded-[8px] flex-shrink-0"
                    >
                      <i className="fa-solid fa-gear text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                    </button>
                  </div>
                </Tooltip>
                
                {/* Dropdown de Configuración */}
                {showConfigModal && allColumns && (
                  <div 
                    ref={dropdownRef}
                    className="absolute bg-white rounded-[16px] flex flex-col shadow-lg z-50"
                    style={{
                      width: '298px',
                      height: '361px',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      border: '1px solid #e1e3e5'
                    }}
                  >
                    {/* Header del Dropdown */}
                    <div 
                      className="flex items-center justify-between border-b"
                      style={{
                        padding: '12px 16px',
                        borderBottomColor: '#e1e3e5',
                        height: '48px',
                        minHeight: '48px'
                      }}
                    >
                      <h3 
                        className="text-[#313336]"
                        style={{ 
                          fontFamily: 'SF Pro, sans-serif', 
                          fontSize: '14px',
                          lineHeight: '20.5px',
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          fontVariationSettings: "'wdth' 100"
                        }}
                      >
                        Configuración de tabla
                      </h3>
                      <button
                        onClick={() => setShowConfigModal(false)}
                        className="flex items-center justify-center hover:bg-[#f0f1f2] transition-colors"
                        style={{ 
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px'
                        }}
                      >
                        <i className="fa-solid fa-xmark text-[#4d5054]" style={{ fontSize: '12px' }}></i>
                      </button>
                    </div>

                    {/* Lista de Columnas */}
                    <div 
                      className="overflow-y-auto"
                      style={{ 
                        padding: '8px 0',
                        maxHeight: 'calc(361px - 48px - 60px)',
                        flex: '1 1 auto',
                        minHeight: 0
                      }}
                    >
                      {allColumns
                        .filter(col => col.key !== 'checkbox' && col.key !== 'edicion')
                        .sort((a, b) => {
                          const indexA = columnOrder.indexOf(a.key)
                          const indexB = columnOrder.indexOf(b.key)
                          return indexA - indexB
                        })
                        .map((col) => {
                          const isVisible = visibleColumns.has(col.key)
                          const isDragging = draggedColumn === col.key

                          return (
                            <div
                              key={col.key}
                              draggable
                              onDragStart={(e) => {
                                setDraggedColumn(col.key)
                                e.dataTransfer.effectAllowed = 'move'
                              }}
                              onDragOver={(e) => {
                                e.preventDefault()
                                e.dataTransfer.dropEffect = 'move'
                                const rect = e.currentTarget.getBoundingClientRect()
                                const midY = rect.top + rect.height / 2
                                if (e.clientY < midY) {
                                  e.currentTarget.style.borderTop = '2px solid #3658c1'
                                  e.currentTarget.style.borderBottom = 'none'
                                } else {
                                  e.currentTarget.style.borderBottom = '2px solid #3658c1'
                                  e.currentTarget.style.borderTop = 'none'
                                }
                              }}
                              onDragLeave={(e) => {
                                e.currentTarget.style.borderTop = 'none'
                                e.currentTarget.style.borderBottom = 'none'
                              }}
                              onDrop={(e) => {
                                e.preventDefault()
                                e.currentTarget.style.borderTop = 'none'
                                e.currentTarget.style.borderBottom = 'none'
                                if (draggedColumn && draggedColumn !== col.key) {
                                  const newOrder = [...columnOrder]
                                  const draggedIndex = newOrder.indexOf(draggedColumn)
                                  const targetIndex = newOrder.indexOf(col.key)
                                  newOrder.splice(draggedIndex, 1)
                                  newOrder.splice(targetIndex, 0, draggedColumn)
                                  setColumnOrder(newOrder)
                                }
                                setDraggedColumn(null)
                              }}
                              onDragEnd={() => {
                                setDraggedColumn(null)
                                // Limpiar estilos de todos los elementos
                                document.querySelectorAll('[draggable="true"]').forEach(el => {
                                  (el as HTMLElement).style.borderTop = 'none'
                                  ;(el as HTMLElement).style.borderBottom = 'none'
                                })
                              }}
                              className="flex items-center cursor-move"
                              style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                gap: '12px',
                                minHeight: '40px',
                                height: '40px',
                                backgroundColor: isDragging ? '#f1f4fe' : 'transparent',
                                opacity: isDragging ? 0.5 : 1
                              }}
                              onMouseEnter={(e) => {
                                if (!isDragging) {
                                  e.currentTarget.style.backgroundColor = '#f7f8fa'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isDragging) {
                                  e.currentTarget.style.backgroundColor = 'transparent'
                                }
                              }}
                            >
                              {/* Icono de arrastre (Grip) y Switch */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <div 
                                  className="cursor-grab active:cursor-grabbing flex items-center justify-center"
                                  style={{
                                    width: '16px',
                                    height: '16px'
                                  }}
                                >
                                  <i className="fa-solid fa-grip-dots-vertical text-[#919499]" style={{ fontSize: '16px' }}></i>
                                </div>

                                {/* Switch */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const newVisible = new Set(visibleColumns)
                                    if (isVisible) {
                                      newVisible.delete(col.key)
                                    } else {
                                      newVisible.add(col.key)
                                    }
                                    setVisibleColumns(newVisible)
                                  }}
                                  className="relative transition-all duration-200"
                                  style={{
                                    width: '40px',
                                    height: '24px',
                                    borderRadius: '12px',
                                    backgroundColor: isVisible ? '#3658c1' : '#c6c8cc',
                                    border: 'none',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                  }}
                                  type="button"
                                >
                                  <div
                                    className="absolute bg-white rounded-full transition-all duration-200"
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      top: '4px',
                                      left: isVisible ? '20px' : '4px',
                                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                                    }}
                                  />
                                </button>
                              </div>

                              {/* Nombre de la columna */}
                              <span 
                                className="flex-1 text-[#313336]"
                                style={{ 
                                  fontFamily: 'SF Pro, sans-serif',
                                  fontSize: '14px',
                                  lineHeight: '20.5px',
                                  fontWeight: 400,
                                  letterSpacing: '0.5px',
                                  fontVariationSettings: "'wdth' 100"
                                }}
                              >
                                {col.label}
                              </span>
                            </div>
                          )
                        })}
                    </div>

                    {/* Footer con botones */}
                    <div 
                      className="flex items-center gap-2 border-t flex-shrink-0"
                      style={{
                        borderTopColor: '#e1e3e5',
                        padding: '12px 16px',
                        height: '60px',
                        minHeight: '60px'
                      }}
                    >
                      <button
                        onClick={() => setShowConfigModal(false)}
                        className="bg-white border hover:bg-[#f7f8fa] transition-colors flex-1"
                        style={{
                          fontFamily: 'SF Pro, sans-serif',
                          fontSize: '14px',
                          lineHeight: '20.5px',
                          fontWeight: 700,
                          color: '#313336',
                          letterSpacing: '0.5px',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          borderColor: '#c6c8cc',
                          fontVariationSettings: "'wdth' 100",
                          height: '32px'
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => setShowConfigModal(false)}
                        className="border transition-colors flex-1"
                        style={{
                          fontFamily: 'SF Pro, sans-serif',
                          fontSize: '14px',
                          lineHeight: '20.5px',
                          fontWeight: 700,
                          color: '#ffffff',
                          letterSpacing: '0.5px',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#3658c1',
                          borderColor: '#3658c1',
                          fontVariationSettings: "'wdth' 100",
                          height: '32px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#28408f'
                          e.currentTarget.style.borderColor = '#28408f'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#3658c1'
                          e.currentTarget.style.borderColor = '#3658c1'
                        }}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Separador vertical */}
              <div className="w-px h-6 bg-[#c6c8cc] mx-2 flex-shrink-0" />

              {/* Búsqueda */}
              <div className="w-[223px] h-8 bg-white border border-[#c6c8cc] rounded-[8px] flex items-center gap-2 px-2 flex-shrink-0">
                <i className="fa-solid fa-search text-[#919499]" style={{ fontSize: '16px' }}></i>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-sm text-[#6c6e73] outline-none min-w-0"
                  style={{ fontFamily: 'SF Pro, sans-serif', fontSize: '14px', lineHeight: '20.5px', letterSpacing: '0.5px' }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="flex items-center justify-center hover:bg-[#f0f1f2] rounded-[4px] transition-colors flex-shrink-0"
                    style={{ width: '16px', height: '16px' }}
                  >
                    <i className="fa-solid fa-xmark text-[#919499]" style={{ fontSize: '12px' }}></i>
                  </button>
                )}
              </div>

              {/* Botón filtro */}
              <div className="relative">
                <Tooltip text="Filtros de la tabla">
                  <div>
                    <button 
                      ref={filtersButtonRef}
                      onClick={() => setShowFiltersModal(!showFiltersModal)}
                      className="w-8 h-8 bg-[#f7f8fa] border border-[#c6c8cc] rounded-[8px] flex items-center justify-center hover:bg-[#f0f1f2] flex-shrink-0 relative"
                    >
                      <i className="fa-solid fa-filter-list text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                      {advancedFilters.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ef4444] rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">{advancedFilters.length}</span>
                        </span>
                      )}
                    </button>
                  </div>
                </Tooltip>

                {/* Dropdown de Filtros Avanzados */}
                {showFiltersModal && (
                  <div 
                    ref={filtersDropdownRef}
                    className="absolute bg-white rounded-[16px] flex flex-col shadow-lg z-50"
                    style={{
                      width: '400px',
                      maxHeight: '600px',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      border: '1px solid #e1e3e5'
                    }}
                  >
                    {/* Header */}
                    <div 
                      className="flex items-center gap-3 border-b"
                      style={{
                        padding: '12px 16px',
                        borderBottomColor: '#e1e3e5',
                        height: '48px',
                        minHeight: '48px'
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: '#e3e9fc'
                        }}
                      >
                        <i className="fa-solid fa-filter-list" style={{ fontSize: '16px', color: '#3658c1' }}></i>
                      </div>
                      <h3 
                        className="text-[#313336] flex-1"
                        style={{ 
                          fontFamily: 'SF Pro, sans-serif', 
                          fontSize: '14px',
                          lineHeight: '20.5px',
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          fontVariationSettings: "'wdth' 100"
                        }}
                      >
                        Filtros avanzados
                      </h3>
                    </div>

                    {/* Contenido */}
                    <div 
                      className="overflow-y-auto"
                      style={{ 
                        maxHeight: 'calc(600px - 48px - 60px)',
                        flex: '1 1 auto',
                        minHeight: 0
                      }}
                    >
                      {/* Sección Agregar filtro */}
                      <div 
                        style={{
                          width: '100%',
                          padding: '16px',
                          backgroundColor: '#f7f8fa',
                          borderBottom: '1px solid #e1e3e5'
                        }}
                      >
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Autocomplete
                              label="Agregar filtro"
                              placeholder="Seleccionar columna..."
                              value={selectedColumnForFilter}
                              options={allColumns
                                .filter(col => col.key !== 'checkbox' && col.key !== 'edicion' && col.key !== 'vistaFicha')
                                .map(col => {
                                  const columnType = getColumnType(col.key)
                                  const getTypeIcon = (type: 'numeric' | 'text' | 'option') => {
                                    if (type === 'text') return 'text'
                                    if (type === 'numeric') return 'hashtag'
                                    if (type === 'option') return 'list-ul'
                                    return null
                                  }
                                  return {
                                    value: col.key,
                                    label: col.label,
                                    icon: getTypeIcon(columnType) || undefined
                                  }
                                })}
                              onSelect={(selectedValue) => {
                                // Solo actualizar el valor seleccionado, no agregar el filtro todavía
                                setSelectedColumnForFilter(selectedValue || '')
                              }}
                              onClear={() => {
                                setSelectedColumnForFilter('')
                              }}
                            />
                          </div>
                          <Tooltip text="Añadir">
                            <button
                              onClick={() => {
                                if (selectedColumnForFilter) {
                                  setAdvancedFilters([...advancedFilters, {
                                    id: `filter-${Date.now()}`,
                                    column: selectedColumnForFilter,
                                    operator: '',
                                    value: ''
                                  }])
                                  // Resetear el autocomplete después de agregar
                                  setSelectedColumnForFilter('')
                                }
                              }}
                              disabled={!selectedColumnForFilter}
                              className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors flex-shrink-0"
                              style={{
                                backgroundColor: selectedColumnForFilter ? '#f7f8fa' : '#f7f8fa',
                                borderColor: '#c6c8cc',
                                cursor: selectedColumnForFilter ? 'pointer' : 'not-allowed',
                                opacity: selectedColumnForFilter ? 1 : 0.6
                              }}
                              onMouseEnter={(e) => {
                                if (selectedColumnForFilter) {
                                  e.currentTarget.style.backgroundColor = '#f0f1f2'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (selectedColumnForFilter) {
                                  e.currentTarget.style.backgroundColor = '#f7f8fa'
                                }
                              }}
                            >
                              <i 
                                className="fa-solid fa-plus" 
                                style={{ 
                                  fontSize: '16px',
                                  color: selectedColumnForFilter ? '#4d5054' : '#babcbf'
                                }}
                              ></i>
                            </button>
                          </Tooltip>
                        </div>
                      </div>

                      {/* Estado Empty o Lista de filtros */}
                      {advancedFilters.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12" style={{ paddingLeft: '0', paddingRight: '0' }}>
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                            style={{
                              backgroundColor: '#e3e9fc'
                            }}
                          >
                            <i className="fa-solid fa-filter-list" style={{ fontSize: '32px', color: '#3658c1' }}></i>
                          </div>
                          <p 
                            className="text-[#313336] mb-2"
                            style={{
                              fontFamily: 'SF Pro, sans-serif',
                              fontSize: '14px',
                              lineHeight: '20.5px',
                              fontWeight: 600,
                              letterSpacing: '0.5px'
                            }}
                          >
                            No hay Filtros configurados
                          </p>
                          <p 
                            className="text-[#6c6e73] text-center"
                            style={{
                              fontFamily: 'SF Pro, sans-serif',
                              fontSize: '12px',
                              lineHeight: '17.5px',
                              fontWeight: 400,
                              letterSpacing: '0.5px'
                            }}
                          >
                            Agrega un filtro seleccionando una columna
                          </p>
                        </div>
                      ) : (
                        <div style={{ padding: '16px' }}>
                          {/* Lista de filtros */}
                          <div className="flex flex-col rounded-[12px] gap-2">
                            {advancedFilters.map((filter, index) => {
                          const selectedColumn = allColumns.find(c => c.key === filter.column)
                          const columnType = selectedColumn ? getColumnType(selectedColumn.key) : null
                          const operators = getOperators(columnType || 'text')
                          const columnOptions = columnType === 'option' ? getColumnOptions(filter.column) : []
                          const isFilterActive = filter.column && filter.operator && filter.value
                          
                          const getTypeIcon = (type: 'numeric' | 'text' | 'option' | null) => {
                            if (type === 'text') return 'text'
                            if (type === 'numeric') return 'hashtag'
                            if (type === 'option') return 'list-ul'
                            return null
                          }
                          const typeIcon = columnType ? getTypeIcon(columnType) : null
                          const isLast = index === advancedFilters.length - 1
                          
                          return (
                            <React.Fragment key={filter.id}>
                              <div 
                                className="flex flex-col rounded-[12px] transition-colors"
                                style={{
                                  backgroundColor: isFilterActive ? '#f1f4fe' : '#f7f8fa',
                                  border: `1px solid ${isFilterActive ? '#627dd0' : '#c6c8cc'}`,
                                  padding: '16px',
                                  gap: '16px'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isFilterActive) {
                                    e.currentTarget.style.backgroundColor = '#f1f4fe'
                                    e.currentTarget.style.borderColor = '#627dd0'
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isFilterActive) {
                                    e.currentTarget.style.backgroundColor = '#f7f8fa'
                                    e.currentTarget.style.borderColor = '#c6c8cc'
                                  }
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {typeIcon && (
                                      <i
                                        className={`fa-regular fa-${typeIcon}`}
                                        style={{
                                          fontSize: '16px',
                                          color: '#3658c1'
                                        }}
                                      />
                                    )}
                                    <span 
                                      className="text-[#313336]"
                                      style={{
                                        fontFamily: 'SF Pro, sans-serif',
                                        fontSize: '16px',
                                        lineHeight: '24px',
                                        fontWeight: 700,
                                        letterSpacing: '0px',
                                        fontVariationSettings: "'wdth' 100"
                                      }}
                                    >
                                      {selectedColumn ? selectedColumn.label : `Filtro ${index + 1}`}
                                    </span>
                                  </div>
                                  <Tooltip text="Cerrar filtro">
                                    <button
                                      onClick={() => {
                                        setAdvancedFilters(advancedFilters.filter(f => f.id !== filter.id))
                                      }}
                                      className="flex items-center justify-center transition-colors"
                                      style={{ 
                                        width: '26px',
                                        height: '26px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #d1d1d1',
                                        borderRadius: '100px'
                                      }}
                                    >
                                      <i className="fa-solid fa-xmark text-[#4c4c4c]" style={{ fontSize: '10px' }}></i>
                                    </button>
                                  </Tooltip>
                                </div>

                                {/* Selector de operador */}
                                <Autocomplete
                                  placeholder="Seleccionar operador..."
                                  value={filter.operator}
                                  options={operators.map(op => ({
                                    value: op.value,
                                    label: op.label
                                  }))}
                                  onSelect={(selectedValue) => {
                                    const newFilters = [...advancedFilters]
                                    newFilters[index].operator = selectedValue
                                    if (selectedValue !== 'between') {
                                      newFilters[index].value2 = undefined
                                    }
                                    setAdvancedFilters(newFilters)
                                  }}
                                  onClear={() => {
                                    const newFilters = [...advancedFilters]
                                    newFilters[index].operator = ''
                                    newFilters[index].value2 = undefined
                                    setAdvancedFilters(newFilters)
                                  }}
                                />

                                {/* Input de valor */}
                                {filter.column && filter.operator && (
                                  <>
                                    {columnType === 'option' ? (
                                      <Autocomplete
                                        placeholder="Seleccionar valor..."
                                        value={filter.value}
                                        options={columnOptions.map(opt => ({
                                          value: opt,
                                          label: opt
                                        }))}
                                        onSelect={(selectedValue) => {
                                          const newFilters = [...advancedFilters]
                                          newFilters[index].value = selectedValue
                                          setAdvancedFilters(newFilters)
                                        }}
                                        onClear={() => {
                                          const newFilters = [...advancedFilters]
                                          newFilters[index].value = ''
                                          setAdvancedFilters(newFilters)
                                        }}
                                      />
                                    ) : (
                                      <>
                                        <input
                                          type={columnType === 'numeric' ? 'number' : 'text'}
                                          value={filter.value}
                                          onChange={(e) => {
                                            const newFilters = [...advancedFilters]
                                            newFilters[index].value = e.target.value
                                            setAdvancedFilters(newFilters)
                                          }}
                                          placeholder="Valor"
                                          className="w-full h-8 px-2 border rounded-[8px] bg-white transition-colors"
                                          style={{
                                            fontFamily: 'SF Pro, sans-serif',
                                            fontSize: '14px',
                                            lineHeight: '20.5px',
                                            fontWeight: 400,
                                            color: filter.value ? '#313336' : '#6c6e73',
                                            letterSpacing: '0.5px',
                                            fontVariationSettings: "'wdth' 100",
                                            borderColor: '#c6c8cc'
                                          }}
                                          onFocus={(e) => {
                                            e.currentTarget.style.borderColor = '#3658c1'
                                          }}
                                          onBlur={(e) => {
                                            e.currentTarget.style.borderColor = '#c6c8cc'
                                          }}
                                        />
                                        {filter.operator === 'between' && (
                                          <input
                                            type="number"
                                            value={filter.value2 || ''}
                                            onChange={(e) => {
                                              const newFilters = [...advancedFilters]
                                              newFilters[index].value2 = e.target.value
                                              setAdvancedFilters(newFilters)
                                            }}
                                            placeholder="Valor final"
                                            className="w-full h-8 px-2 border rounded-[8px] bg-white transition-colors"
                                            style={{
                                              fontFamily: 'SF Pro, sans-serif',
                                              fontSize: '14px',
                                              lineHeight: '20.5px',
                                              fontWeight: 400,
                                              color: filter.value2 ? '#313336' : '#6c6e73',
                                              letterSpacing: '0.5px',
                                              fontVariationSettings: "'wdth' 100",
                                              borderColor: '#c6c8cc'
                                            }}
                                            onFocus={(e) => {
                                              e.currentTarget.style.borderColor = '#3658c1'
                                            }}
                                            onBlur={(e) => {
                                              e.currentTarget.style.borderColor = '#c6c8cc'
                                            }}
                                          />
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                              
                              {/* Dropdown AND/OR entre cards */}
                              {!isLast && (
                                <div className="flex items-center justify-center my-2 relative">
                                  <button
                                    ref={(el) => {
                                      if (el) {
                                        logicButtonRefs.current.set(index, el)
                                      } else {
                                        logicButtonRefs.current.delete(index)
                                      }
                                    }}
                                    onClick={() => setOpenLogicDropdownIndex(openLogicDropdownIndex === index ? null : index)}
                                    className="flex items-center gap-2 rounded-[8px] border transition-colors"
                                    style={{
                                      fontFamily: 'SF Pro, sans-serif',
                                      fontSize: '14px',
                                      lineHeight: '20.5px',
                                      fontWeight: 700,
                                      letterSpacing: '0.5px',
                                      padding: '6px 12px',
                                      height: '32px',
                                      backgroundColor: openLogicDropdownIndex === index ? '#d4d6d9' : '#f7f8fa',
                                      color: '#313336',
                                      borderColor: '#c6c8cc',
                                      fontVariationSettings: "'wdth' 100"
                                    }}
                                  >
                                    <span>{filterLogic === 'AND' ? 'And' : 'Or'}</span>
                                    <i className={`fa-regular fa-chevron-${openLogicDropdownIndex === index ? 'up' : 'down'}`} style={{ fontSize: '16px', color: '#4d5054' }}></i>
                                  </button>
                                  
                                  {/* Dropdown de lógica */}
                                  {openLogicDropdownIndex === index && createPortal(
                                    <div
                                      ref={(el) => {
                                        if (el) {
                                          logicDropdownRefs.current.set(index, el)
                                        } else {
                                          logicDropdownRefs.current.delete(index)
                                        }
                                      }}
                                      className="fixed bg-white border border-[#c6c8cc] rounded-[12px] shadow-lg z-[99999]"
                                      style={{
                                        top: `${logicButtonRefs.current.get(index) ? logicButtonRefs.current.get(index)!.getBoundingClientRect().bottom + window.scrollY + 4 : 0}px`,
                                        left: `${logicButtonRefs.current.get(index) ? logicButtonRefs.current.get(index)!.getBoundingClientRect().left + window.scrollX : 0}px`,
                                        minWidth: `${logicButtonRefs.current.get(index) ? logicButtonRefs.current.get(index)!.offsetWidth : 132}px`,
                                        width: 'auto'
                                      }}
                                    >
                                      <div className="flex flex-col gap-2 p-2">
                                        <div
                                          onClick={() => {
                                            setFilterLogic('AND')
                                            setOpenLogicDropdownIndex(null)
                                          }}
                                          className="flex items-center gap-2 px-2 py-1.5 rounded-[8px] cursor-pointer transition-colors"
                                          style={{
                                            height: '32px',
                                            backgroundColor: filterLogic === 'AND' ? '#f0f1f2' : 'transparent',
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                            paddingTop: '6px',
                                            paddingBottom: '6px'
                                          }}
                                          onMouseEnter={(e) => {
                                            if (filterLogic !== 'AND') {
                                              e.currentTarget.style.backgroundColor = '#f0f1f2'
                                            }
                                          }}
                                          onMouseLeave={(e) => {
                                            if (filterLogic !== 'AND') {
                                              e.currentTarget.style.backgroundColor = 'transparent'
                                            }
                                          }}
                                        >
                                          <div className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0" style={{ borderColor: '#c6c8cc' }}>
                                            {filterLogic === 'AND' && (
                                              <div className="w-2 h-2 rounded-full bg-[#3658c1]"></div>
                                            )}
                                          </div>
                                          <span
                                            style={{
                                              fontFamily: 'SF Pro, sans-serif',
                                              fontSize: '14px',
                                              lineHeight: '20.5px',
                                              fontWeight: 500,
                                              letterSpacing: '0.5px',
                                              color: '#313336',
                                              fontVariationSettings: "'wdth' 100"
                                            }}
                                          >
                                            And
                                          </span>
                                        </div>
                                        <div
                                          onClick={() => {
                                            setFilterLogic('OR')
                                            setOpenLogicDropdownIndex(null)
                                          }}
                                          className="flex items-center gap-2 px-2 py-1.5 rounded-[8px] cursor-pointer transition-colors"
                                          style={{
                                            height: '32px',
                                            backgroundColor: filterLogic === 'OR' ? '#f0f1f2' : 'transparent',
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                            paddingTop: '6px',
                                            paddingBottom: '6px'
                                          }}
                                          onMouseEnter={(e) => {
                                            if (filterLogic !== 'OR') {
                                              e.currentTarget.style.backgroundColor = '#f0f1f2'
                                            }
                                          }}
                                          onMouseLeave={(e) => {
                                            if (filterLogic !== 'OR') {
                                              e.currentTarget.style.backgroundColor = 'transparent'
                                            }
                                          }}
                                        >
                                          <div className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0" style={{ borderColor: '#c6c8cc' }}>
                                            {filterLogic === 'OR' && (
                                              <div className="w-2 h-2 rounded-full bg-[#3658c1]"></div>
                                            )}
                                          </div>
                                          <span
                                            style={{
                                              fontFamily: 'SF Pro, sans-serif',
                                              fontSize: '14px',
                                              lineHeight: '20.5px',
                                              fontWeight: 500,
                                              letterSpacing: '0.5px',
                                              color: '#313336',
                                              fontVariationSettings: "'wdth' 100"
                                            }}
                                          >
                                            Or
                                          </span>
                                        </div>
                                      </div>
                                    </div>,
                                    document.body
                                  )}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div 
                      className="flex items-center justify-between border-t flex-shrink-0"
                      style={{
                        borderTopColor: '#e1e3e5',
                        padding: '12px 16px',
                        height: '60px',
                        minHeight: '60px'
                      }}
                    >
                      <Tooltip text="Limpiar">
                        <button
                          onClick={() => {
                            setAdvancedFilters([])
                          }}
                          className="w-8 h-8 bg-[#f7f8fa] border border-[#c6c8cc] rounded-full flex items-center justify-center hover:bg-[#f0f1f2] flex-shrink-0 transition-colors"
                        >
                          <i className="fa-solid fa-broom-wide text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                        </button>
                      </Tooltip>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowFiltersModal(false)}
                          className="bg-white border hover:bg-[#f7f8fa] transition-colors"
                          style={{
                            fontFamily: 'SF Pro, sans-serif',
                            fontSize: '14px',
                            lineHeight: '20.5px',
                            fontWeight: 700,
                            color: '#313336',
                            letterSpacing: '0.5px',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            borderColor: '#c6c8cc',
                            fontVariationSettings: "'wdth' 100",
                            height: '32px'
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => setShowFiltersModal(false)}
                          className="border transition-colors"
                          disabled={advancedFilters.length === 0}
                          style={{
                            fontFamily: 'SF Pro, sans-serif',
                            fontSize: '14px',
                            lineHeight: '20.5px',
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '0.5px',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            backgroundColor: advancedFilters.length === 0 ? '#b8c5ee' : '#3658c1',
                            borderColor: advancedFilters.length === 0 ? '#b8c5ee' : '#3658c1',
                            fontVariationSettings: "'wdth' 100",
                            height: '32px',
                            cursor: advancedFilters.length === 0 ? 'not-allowed' : 'pointer',
                            opacity: advancedFilters.length === 0 ? 0.6 : 1
                          }}
                          onMouseEnter={(e) => {
                            if (advancedFilters.length > 0) {
                              e.currentTarget.style.backgroundColor = '#28408f'
                              e.currentTarget.style.borderColor = '#28408f'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (advancedFilters.length > 0) {
                              e.currentTarget.style.backgroundColor = '#3658c1'
                              e.currentTarget.style.borderColor = '#3658c1'
                            }
                          }}
                        >
                          Aplicar Filtros
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>

            {/* Indicador de Filtros Aplicados */}
            {(searchTerm || advancedFilters.length > 0) && (
              <div 
                className="flex flex-col border-t"
                style={{
                  paddingTop: '12px',
                  marginTop: '16px',
                  borderTopColor: '#e1e3e5',
                  gap: '8px'
                }}
              >
                {/* Primera línea: "Filtros activos: Limpiar todos" */}
                <div className="flex items-center">
                  <span 
                    className="text-[#6c6e73]"
                    style={{
                      fontFamily: 'SF Pro, sans-serif',
                      fontSize: '14px',
                      lineHeight: '20.5px',
                      fontWeight: 400,
                      letterSpacing: '0.5px'
                    }}
                  >
                    Filtros activos:{' '}
                  </span>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setAdvancedFilters([])
                    }}
                    className="hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: 'SF Pro, sans-serif',
                      fontSize: '14px',
                      lineHeight: '20.5px',
                      fontWeight: 400,
                      color: '#3251b1',
                      letterSpacing: '0.5px',
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      padding: 0
                    }}
                  >
                    Limpiar todos
                  </button>
                </div>
                
                {/* Segunda línea: Tags con filtros */}
                <div className="flex flex-wrap gap-2">
                  {/* Tag de búsqueda */}
                  {searchTerm && (
                    <div 
                      className="flex items-center rounded-[8px] inline-flex"
                      style={{
                        backgroundColor: '#f1fef6',
                        padding: '2px 6px',
                        height: '20px',
                        width: 'fit-content',
                        gap: '4px'
                      }}
                    >
                      {/* Icono de búsqueda */}
                      <i className="fa-solid fa-search" style={{ fontSize: '10px', color: '#1ca34e' }}></i>
                      <span 
                        style={{
                          fontFamily: 'SF Pro, sans-serif',
                          fontSize: '12px',
                          lineHeight: '17.5px',
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                          color: '#1ca34e',
                          fontVariationSettings: "'wdth' 100"
                        }}
                      >
                        "{searchTerm}"
                      </span>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="flex items-center justify-center hover:bg-[#1ca34e] hover:bg-opacity-20 rounded-[6px] transition-colors flex-shrink-0"
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          padding: '2px'
                        }}
                      >
                        <i className="fa-regular fa-xmark text-[#27292b]" style={{ fontSize: '10px' }}></i>
                      </button>
                    </div>
                  )}

                  {/* Tags de filtros avanzados */}
                  {advancedFilters
                    .filter(f => f.column && f.operator && f.value)
                    .map((filter) => {
                      const tagText = getFilterTagText(filter)
                      if (!tagText) return null
                    const operators = getOperators(getColumnType(filter.column))
                    const operator = operators.find(op => op.value === filter.operator)
                    
                      return (
                        <div 
                          key={filter.id}
                          className="flex items-center rounded-[8px] inline-flex"
                          style={{
                            backgroundColor: '#f1f4fe',
                            padding: '2px 6px',
                            height: '20px',
                            width: 'fit-content',
                            gap: '4px'
                          }}
                        >
                          <span 
                            style={{
                              fontFamily: 'SF Pro, sans-serif',
                              fontSize: '12px',
                              lineHeight: '17.5px',
                              fontWeight: 600,
                              letterSpacing: '0.5px',
                              color: '#2d49a1',
                              fontVariationSettings: "'wdth' 100"
                            }}
                          >
                            {tagText}
                          </span>
                          <button
                            onClick={() => {
                              setAdvancedFilters(advancedFilters.filter(f => f.id !== filter.id))
                            }}
                            className="flex items-center justify-center hover:bg-[#2d49a1] hover:bg-opacity-20 rounded-[6px] transition-colors flex-shrink-0"
                            style={{ 
                              width: '16px', 
                              height: '16px',
                              padding: '2px'
                            }}
                          >
                            <i className="fa-regular fa-xmark text-[#27292b]" style={{ fontSize: '10px' }}></i>
                          </button>
                        </div>
                      )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Tabla con scroll horizontal */}
          <div className="flex-1 overflow-x-auto overflow-y-auto w-full min-w-0">
            <div style={{ width: 'max-content', minWidth: '100%', paddingLeft: '16px', paddingRight: '16px' }}>
              {/* Header de la tabla */}
              <div className="sticky top-0 z-10">
                <div className="flex" style={{ gap: '0px', width: 'max-content' }}>
                  {(() => {
                    // Reordenar columnas: checkbox primero, luego bloqueadas en orden, luego el resto
                    const checkboxCol = columns.find(c => c.key === 'checkbox')
                    const edicionCol = columns.find(c => c.key === 'edicion')
                    const lockedCols = lockedColumnOrder.map(key => columns.find(c => c.key === key)).filter(Boolean)
                    const otherCols = columns.filter(c => 
                      c.key !== 'checkbox' && 
                      c.key !== 'edicion' && 
                      !columnLocked.has(c.key)
                    )
                    const orderedColumns = [
                      checkboxCol,
                      ...lockedCols,
                      ...otherCols,
                      edicionCol
                    ].filter(Boolean)
                    
                    return orderedColumns.map((col, idx) => {
                    // Calcular left para columnas bloqueadas
                    let left = 0
                    let isFirstLocked = false
                    let isLastLocked = false
                    const isCheckbox = col.key === 'checkbox'
                    const isLocked = columnLocked.has(col.key) && !isCheckbox
                    const isEdicion = col.key === 'edicion'
                    
                    if (isLocked) {
                      // Obtener el índice de esta columna en el orden de bloqueo
                      const lockOrderIndex = lockedColumnOrder.indexOf(col.key)
                      
                      // Las columnas bloqueadas se posicionan después del checkbox (50px)
                      left = 50 // Ancho de la columna de checkbox
                      
                      // Verificar si es la primera columna bloqueada (primera en el orden)
                      isFirstLocked = lockOrderIndex === 0
                      
                      // Sumar el ancho de todas las columnas bloqueadas que están antes en el orden
                      for (let i = 0; i < lockOrderIndex; i++) {
                        const prevLockedKey = lockedColumnOrder[i]
                        const prevLockedCol = columns.find(c => c.key === prevLockedKey)
                        if (prevLockedCol) {
                          left += prevLockedCol.width
                        }
                      }
                      
                      // Verificar si es la última columna bloqueada (última en el orden de bloqueo)
                      isLastLocked = lockOrderIndex === lockedColumnOrder.length - 1
                    }
                    
                    return (
                    <div
                      key={col.key}
                      className={`bg-[#e1e3e5] flex flex-col flex-shrink-0 ${
                        isCheckbox ? 'sticky z-20' : isEdicion ? 'sticky right-0 z-20' : isLocked ? 'sticky z-20' : ''
                      }`}
                      style={{ 
                        width: `${col.width}px`,
                        ...(isCheckbox ? {
                          left: '0px',
                          backgroundColor: '#e1e3e5',
                          marginLeft: '-16px'
                        } : isEdicion ? { 
                          borderLeft: '2px solid #d4d6d9',
                          backgroundColor: '#e1e3e5'
                        } : isLocked ? {
                          left: `${left}px`,
                          backgroundColor: '#e1e3e5',
                          borderRight: isLastLocked ? '2px solid #d4d6d9' : 'none'
                        } : {})
                      }}
                    >
                      {/* Header Cell */}
                      <div
                        className={`h-12 flex items-center px-4 transition-colors ${
                          headerHovered === col.key ? 'bg-[#f7f8fa]' : 'bg-white'
                        }`}
                        style={{
                          borderRight: col.key === 'edicion' ? '2px solid #d4d6d9' : (isLastLocked ? '2px solid #d4d6d9' : 'none'),
                          gap: '8px',
                        }}
                        onMouseEnter={() => setHeaderHovered(col.key)}
                        onMouseLeave={() => setHeaderHovered(null)}
                      >
                        {col.key === 'checkbox' ? (
                          <CustomCheckbox
                            checked={selectedRows.size === sortedTableData.length && sortedTableData.length > 0}
                            onChange={(checked) => {
                              if (checked) {
                                // Seleccionar todas las filas
                                setSelectedRows(new Set(sortedTableData.map((_, idx) => idx)))
                              } else {
                                // Deseleccionar todas las filas
                                setSelectedRows(new Set())
                              }
                            }}
                            className="w-full"
                          />
                        ) : col.key === 'edicion' ? (
                          <div className="w-full" />
                        ) : (
                          <>
                            {/* Label Group */}
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {(() => {
                                // Usar el icono del diseño desde headerIcons
                                const headerIcon = headerIcons[col.key]
                                if (!headerIcon) return null
                                
                                // Todos los iconos de los headers deben estar en fa-regular
                                const iconClass = 'fa-regular'
                                
                                return (
                                  <i
                                    className={`${iconClass} fa-${headerIcon} flex-shrink-0 ${
                                      col.key === 'estatus' || col.key === 'disponibilidad' || 
                                      col.key === 'latitud' || col.key === 'longitud' || 
                                      col.key === 'direccion' || col.key === 'base' || 
                                      col.key === 'altura' || col.key === 'costoProduccion' || 
                                      col.key === 'precioProduccion' || col.key === 'calificacionRentabilidad' ||
                                      col.key === 'costoAgencia' || col.key === 'precioAgencia' ||
                                      col.key === 'costoClienteDirecto' || col.key === 'precioClienteDirecto' ||
                                      col.key === 'margenGananciaCD' || col.key === 'margenGananciaA' ||
                                      col.key === 'calificacionGeneral'
                                        ? 'text-[#616469]'
                                        : 'text-[#4d5054]'
                                    }`}
                                    style={{ fontSize: '16px' }}
                                  ></i>
                                )
                              })()}
                              <span
                                className="text-[12px] text-[#585a5e] font-normal leading-[17.5px] tracking-[0.5px] overflow-hidden text-ellipsis whitespace-nowrap"
                                style={{ fontFamily: 'SF Pro, sans-serif', fontSize: '12px', lineHeight: '17.5px', fontWeight: 400, letterSpacing: '0.5px', fontVariationSettings: "'wdth' 100" }}
                              >
                                {col.label}
                              </span>
                            </div>
                            {/* Actions Group (Lock, Filter, Sort) */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {/* Lock Icon - No mostrar para checkbox */}
                              {!isCheckbox && (
                                <>
                                  {columnLocked.has(col.key) ? (
                                    <button
                                      className="w-4 h-4 flex items-center justify-center rounded-[2px] hover:bg-[#f0f1f2] transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        const newLocked = new Set(columnLocked)
                                        newLocked.delete(col.key)
                                        setColumnLocked(newLocked)
                                        // Remover del orden de bloqueo
                                        setLockedColumnOrder(prev => prev.filter(key => key !== col.key))
                                      }}
                                    >
                                      <i className="fa-solid fa-lock text-[#4d5054]" style={{ fontSize: '10px' }}></i>
                                    </button>
                                  ) : headerHovered === col.key ? (
                                    <button
                                      className="w-4 h-4 flex items-center justify-center rounded-[2px] hover:bg-[#f0f1f2] transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        const newLocked = new Set(columnLocked)
                                        newLocked.add(col.key)
                                        setColumnLocked(newLocked)
                                        // Agregar al final del orden de bloqueo
                                        setLockedColumnOrder(prev => [...prev, col.key])
                                      }}
                                    >
                                      <i className="fa-regular fa-lock-open text-[#616469]" style={{ fontSize: '10px' }}></i>
                                    </button>
                                  ) : null}
                                </>
                              )}
                              
                              {/* Filter Icon */}
                              {columnFiltered.has(col.key) ? (
                                <div className="w-4 h-4 flex items-center justify-center rounded-[2px]">
                                  <i className="fa-solid fa-filter text-[#3251b1]" style={{ fontSize: '10px' }}></i>
                                </div>
                              ) : headerHovered === col.key ? (
                                <div className="w-4 h-4 flex items-center justify-center rounded-[2px]">
                                  <i className="fa-regular fa-filter text-[#616469]" style={{ fontSize: '10px' }}></i>
                                </div>
                              ) : null}
                              
                              {/* Sort Icon */}
                              {columnSort.get(col.key) === 'up' ? (
                                <button
                                  className="w-4 h-4 flex items-center justify-center rounded-[2px] hover:bg-[#f0f1f2] transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // Cambiar a descendente, manteniendo solo esta columna
                                    const newSort = new Map<string, 'up' | 'down' | null>()
                                    newSort.set(col.key, 'down')
                                    setColumnSort(newSort)
                                  }}
                                >
                                  <i className="fa-solid fa-arrow-up text-[#3251b1]" style={{ fontSize: '10px' }}></i>
                                </button>
                              ) : columnSort.get(col.key) === 'down' ? (
                                <button
                                  className="w-4 h-4 flex items-center justify-center rounded-[2px] hover:bg-[#f0f1f2] transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // Remover el sort de esta columna
                                    const newSort = new Map(columnSort)
                                    newSort.delete(col.key)
                                    setColumnSort(newSort)
                                  }}
                                >
                                  <i className="fa-solid fa-arrow-down text-[#3251b1]" style={{ fontSize: '10px' }}></i>
                                </button>
                              ) : headerHovered === col.key ? (
                                <button
                                  className="w-4 h-4 flex items-center justify-center rounded-[2px] hover:bg-[#f0f1f2] transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // Resetear todas las columnas y establecer la nueva en ascendente
                                    const newSort = new Map<string, 'up' | 'down' | null>()
                                    newSort.set(col.key, 'up')
                                    setColumnSort(newSort)
                                  }}
                                >
                                  <i className="fa-regular fa-arrow-down-arrow-up text-[#616469]" style={{ fontSize: '10px' }}></i>
                                </button>
                              ) : null}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    )
                  })
                  })()}
                </div>
              </div>

              {/* Filas de la tabla */}
              <div>
                {sortedTableData.map((row, rowIdx) => {
                  // Reordenar columnas: checkbox primero, luego bloqueadas en orden, luego el resto
                  const checkboxCol = columns.find(c => c.key === 'checkbox')
                  const edicionCol = columns.find(c => c.key === 'edicion')
                  const lockedCols = lockedColumnOrder.map(key => columns.find(c => c.key === key)).filter(Boolean)
                  const otherCols = columns.filter(c => 
                    c.key !== 'checkbox' && 
                    c.key !== 'edicion' && 
                    !columnLocked.has(c.key)
                  )
                  const orderedColumns = [
                    checkboxCol,
                    ...lockedCols,
                    ...otherCols,
                    edicionCol
                  ].filter(Boolean)
                  
                  return (
                    <div key={row.id} className="flex flex-shrink-0" style={{ gap: '0px', width: 'max-content' }}>
                    {orderedColumns.map((col, colIdx) => {
                      // Calcular left para columnas bloqueadas en las filas
                      let left = 0
                      let isFirstLocked = false
                      let isLastLocked = false
                      const isCheckbox = col.key === 'checkbox'
                      const isLocked = columnLocked.has(col.key) && !isCheckbox
                      const isEdicion = col.key === 'edicion'
                      
                      if (isLocked) {
                        // Obtener el índice de esta columna en el orden de bloqueo
                        const lockOrderIndex = lockedColumnOrder.indexOf(col.key)
                        
                        // Las columnas bloqueadas se posicionan después del checkbox (50px)
                        left = 50 // Ancho de la columna de checkbox
                        
                        // Verificar si es la primera columna bloqueada (primera en el orden)
                        isFirstLocked = lockOrderIndex === 0
                        
                        // Sumar el ancho de todas las columnas bloqueadas que están antes en el orden
                        for (let i = 0; i < lockOrderIndex; i++) {
                          const prevLockedKey = lockedColumnOrder[i]
                          const prevLockedCol = columns.find(c => c.key === prevLockedKey)
                          if (prevLockedCol) {
                            left += prevLockedCol.width
                          }
                        }
                        
                        // Verificar si es la última columna bloqueada (última en el orden de bloqueo)
                        isLastLocked = lockOrderIndex === lockedColumnOrder.length - 1
                      }
                      const cellKey = `${rowIdx}-${colIdx}`
                      const isRowEditing = editingCells.has(`row-${rowIdx}`)
                      const isRowSelected = selectedRows.has(rowIdx)
                      const isCellSelected = selectedCell?.rowIdx === rowIdx && selectedCell?.colIdx === colIdx && !isRowEditing
                      const isSelected = (isRowSelected || isCellSelected) && !isRowEditing
                      const isDisabled = disabledCells.has(cellKey) && !isRowEditing
                      const isFocused = focusedCell?.rowIdx === rowIdx && focusedCell?.colIdx === colIdx && !isRowEditing
                      const isHovered = hoveredCell?.rowIdx === rowIdx && hoveredCell?.colIdx === colIdx && !isFocused && !isSelected && !isDisabled && !isRowEditing
                      
                      // Determinar si la celda debe tener el estilo visual de edición (todas las celdas de la fila)
                      const hasEditingStyle = isRowEditing
                      
                      // Solo las columnas de calificaciones, costos y precios son editables (excepto costo y precio de producción)
                      const editableColumns = [
                        'calificacionTecnica',
                        'calificacionRentabilidad',
                        'calificacionProveedor',
                        'costoAgencia',
                        'costoClienteDirecto',
                        'precioAgencia',
                        'precioClienteDirecto'
                      ]
                      const isEditing = isRowEditing && editableColumns.includes(col.key)

                      // Determinar estilos según el estado
                      let bgColor = 'bg-white'
                      let textColor = 'text-[#313336]'
                      let borderStyle = 'none'

                      if (hasEditingStyle) {
                        bgColor = 'bg-[#f1f4fe]'
                        textColor = 'text-[#313336]'
                        borderStyle = '1px solid #627dd0'
                      } else if (isFocused) {
                        bgColor = 'bg-[#f1f4fe]'
                        textColor = 'text-[#313336]'
                        borderStyle = '1px solid #627dd0'
                      } else if (isSelected) {
                        bgColor = 'bg-[#f1f4fe]'
                        textColor = 'text-[#243a80]'
                      } else if (isDisabled) {
                        bgColor = 'bg-[#f7f8fa]'
                        textColor = 'text-[#babcbf]'
                      } else if (isHovered) {
                        bgColor = 'bg-[#f7f8fa]'
                        textColor = 'text-[#313336]'
                      }

                      return (
                        <div
                          key={col.key}
                          className={`flex items-center px-4 h-14 flex-shrink-0 transition-colors ${bgColor} ${
                            isCheckbox ? 'sticky z-20' : isEdicion ? 'sticky right-0 z-20' : isLocked ? 'sticky z-20' : ''
                          }`}
                          style={{
                            ...(isCheckbox ? {
                              left: '0px',
                              marginLeft: '-16px'
                            } : isEdicion ? {} : isLocked ? { 
                              left: `${left}px`
                            } : {}),
                            width: `${col.width}px`,
                            borderRight: col.key === 'edicion' ? (hasEditingStyle ? '2px solid #d4d6d9' : '2px solid #d4d6d9') : (isLastLocked ? '2px solid #d4d6d9' : 'none'),
                            borderLeft: col.key === 'edicion' ? (hasEditingStyle ? '2px solid #d4d6d9' : '2px solid #d4d6d9') : (isFocused && !hasEditingStyle ? '1px solid #627dd0' : 'none'),
                            borderTop: hasEditingStyle ? '1px solid #627dd0' : (isFocused && !hasEditingStyle ? '1px solid #627dd0' : 'none'),
                            borderBottom: hasEditingStyle ? (rowIdx < sortedTableData.length - 1 ? '1px solid #627dd0' : 'none') : (isFocused && !hasEditingStyle ? '1px solid #627dd0' : (rowIdx < sortedTableData.length - 1 ? '2px solid #e1e3e5' : 'none')),
                            boxSizing: 'border-box',
                          }}
                          onMouseEnter={() => {
                            if (!isRowEditing) {
                              setHoveredCell({ rowIdx, colIdx })
                            }
                          }}
                          onMouseLeave={() => setHoveredCell(null)}
                          onClick={() => {
                            if (!isDisabled && !isRowEditing) {
                              // Si se hace click en la misma celda, deseleccionarla
                              if (isSelected) {
                                setSelectedCell(null)
                              } else {
                                // Seleccionar la nueva celda (automáticamente deselecciona la anterior)
                                setSelectedCell({ rowIdx, colIdx })
                              }
                              // Quitar el focus cuando se hace click
                              setFocusedCell(null)
                            }
                          }}
                          onFocus={() => {
                            if (!isDisabled && !isRowEditing) {
                              // Al hacer focus, quitar la selección anterior
                              setSelectedCell(null)
                              setFocusedCell({ rowIdx, colIdx })
                            }
                          }}
                          onBlur={() => {
                            if (!isRowEditing) {
                              setFocusedCell(null)
                            }
                          }}
                          tabIndex={isDisabled || isRowEditing ? -1 : 0}
                        >
                        {col.key === 'checkbox' ? (
                          <CustomCheckbox
                            checked={selectedRows.has(rowIdx)}
                            onChange={(checked) => {
                              const newSelectedRows = new Set(selectedRows)
                              if (checked) {
                                newSelectedRows.add(rowIdx)
                              } else {
                                newSelectedRows.delete(rowIdx)
                              }
                              setSelectedRows(newSelectedRows)
                            }}
                            className="w-full"
                          />
                        ) : col.key === 'vistaFicha' ? (
                          <div className="w-full flex items-center justify-center">
                            <Tooltip text="Vista ficha">
                              <button className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-[#f0f1f2] rounded-[8px] transition-colors">
                                <i className="fa-regular fa-image text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                              </button>
                            </Tooltip>
                          </div>
                        ) : col.key === 'edicion' ? (
                          <div className="w-full flex items-center justify-center">
                            <Tooltip text={editingCells.has(`row-${rowIdx}`) ? "Guardar cambios" : "Editar"}>
                              <button
                                className={`w-8 h-8 flex items-center justify-center rounded-[8px] transition-colors ${
                                  editingCells.has(`row-${rowIdx}`)
                                    ? 'bg-[#f7f8fa] border border-[#c6c8cc]'
                                    : 'bg-transparent hover:bg-[#f0f1f2] border border-transparent'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Activar/desactivar modo edición para todas las columnas editables de esta fila
                                  const newEditingCells = new Set(editingCells)
                                  const rowKey = `row-${rowIdx}`
                                  
                                  if (editingCells.has(rowKey)) {
                                    // Desactivar modo edición para esta fila
                                    newEditingCells.delete(rowKey)
                                    
                                    // Limpiar focus y selected de esta fila
                                    if (focusedCell?.rowIdx === rowIdx) {
                                      setFocusedCell(null)
                                    }
                                    if (selectedCell?.rowIdx === rowIdx) {
                                      setSelectedCell(null)
                                    }
                                  } else {
                                    // Activar modo edición para esta fila
                                    newEditingCells.add(rowKey)
                                    
                                    // Limpiar focus y selected de esta fila
                                    if (focusedCell?.rowIdx === rowIdx) {
                                      setFocusedCell(null)
                                    }
                                    if (selectedCell?.rowIdx === rowIdx) {
                                      setSelectedCell(null)
                                    }
                                  }
                                  setEditingCells(newEditingCells)
                                }}
                              >
                                {editingCells.has(`row-${rowIdx}`) ? (
                                  <i className="fa-regular fa-check text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                                ) : (
                                  <i className="fa-regular fa-pen text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                                )}
                              </button>
                            </Tooltip>
                          </div>
                        ) : col.key === 'estatus' || col.key === 'disponibilidad' ? (
                          <div className="flex items-center">
                            {row[col.key as keyof typeof row] === 'Activo' ? (
                              <div className="bg-[#f1fef6] h-5 pl-1.5 pr-1 py-0.5 rounded-[8px] flex items-center justify-center">
                                <span
                                  className="text-[12px] text-[#1ca34e] font-semibold leading-[17.5px] tracking-[0.5px]"
                                  style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100" }}
                                >
                                  {row[col.key as keyof typeof row]}
                                </span>
                              </div>
                            ) : row[col.key as keyof typeof row] === 'No Disponible' ? (
                              <div className="bg-[#fef1f1] h-5 pl-1.5 pr-1 py-0.5 rounded-[8px] flex items-center justify-center">
                                <span
                                  className="text-[12px] text-[#b83434] font-semibold leading-[17.5px] tracking-[0.5px]"
                                  style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100" }}
                                >
                                  {row[col.key as keyof typeof row]}
                                </span>
                              </div>
                            ) : (
                              <div className="bg-[#fef1f1] h-5 pl-1.5 pr-1 py-0.5 rounded-[8px] flex items-center justify-center">
                                <span
                                  className="text-[12px] text-[#b83434] font-semibold leading-[17.5px] tracking-[0.5px]"
                                  style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100" }}
                                >
                                  {row[col.key as keyof typeof row]}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : isEditing ? (
                          <div className="w-full">
                            <div className="bg-white border border-[#c6c8cc] rounded-[8px] h-8 px-2 py-1 flex items-center gap-2">
                              {(col.key === 'calificacionTecnica' || col.key === 'calificacionRentabilidad' || col.key === 'calificacionProveedor') && (
                                <i className="fa-solid fa-star text-[#eab308]" style={{ fontSize: '16px' }}></i>
                              )}
                              <input
                                type="text"
                                value={row[col.key as keyof typeof row] as string || ''}
                                onChange={(e) => {
                                  // Guardar automáticamente el cambio en tiempo real
                                  const newTableData = [...tableData]
                                  const originalRowIndex = tableData.findIndex(r => r.id === row.id)
                                  if (originalRowIndex !== -1) {
                                    newTableData[originalRowIndex] = {
                                      ...newTableData[originalRowIndex],
                                      [col.key]: e.target.value
                                    }
                                    setTableData(newTableData)
                                  }
                                }}
                                className="flex-1 text-[14px] text-[#313336] font-normal leading-[20.5px] tracking-[0.5px] outline-none border-none bg-transparent"
                                style={{ fontFamily: 'SF Pro, sans-serif' }}
                                autoFocus
                              />
                            </div>
                          </div>
                        ) : col.key === 'calificacionTecnica' || col.key === 'calificacionRentabilidad' || col.key === 'calificacionProveedor' ? (
                          <div className="flex items-center gap-2">
                            <i className="fa-solid fa-star text-[#eab308]" style={{ fontSize: '16px' }}></i>
                            <span
                              className={`text-[14px] ${textColor} font-normal leading-[20.5px] tracking-[0.5px] overflow-hidden text-ellipsis whitespace-nowrap`}
                              style={{ fontFamily: 'SF Pro, sans-serif' }}
                            >
                              {row[col.key as keyof typeof row] || ''}
                            </span>
                          </div>
                        ) : col.key === 'calificacionGeneral' ? (
                          <div className="flex items-center gap-2">
                            <i className="fa-solid fa-star text-[#eab308]" style={{ fontSize: '16px' }}></i>
                            <span
                              className={`text-[14px] ${textColor} font-normal leading-[20.5px] tracking-[0.5px] overflow-hidden text-ellipsis whitespace-nowrap`}
                              style={{ fontFamily: 'SF Pro, sans-serif' }}
                            >
                              {row[col.key as keyof typeof row] || ''}
                            </span>
                          </div>
                        ) : col.key === 'margenGananciaCD' || col.key === 'margenGananciaA' ? (
                          <span
                            className={`text-[14px] ${textColor} font-normal leading-[20.5px] tracking-[0.5px] overflow-hidden text-ellipsis whitespace-nowrap`}
                            style={{ fontFamily: 'SF Pro, sans-serif' }}
                          >
                            {row[col.key as keyof typeof row] || ''}
                          </span>
                        ) : (
                          <span
                            className={`text-[14px] ${textColor} font-normal leading-[20.5px] tracking-[0.5px] overflow-hidden text-ellipsis whitespace-nowrap`}
                            style={{ fontFamily: col.key === 'ubicacion' ? 'Open Sans, sans-serif' : 'SF Pro, sans-serif' }}
                          >
                            {row[col.key as keyof typeof row] || ''}
                          </span>
                        )}
                      </div>
                    )
                    })}
                  </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Menú flotante de acciones cuando hay múltiples filas seleccionadas */}
          {selectedRows.size > 1 && (() => {
            // Verificar si todas las filas seleccionadas están en modo edición
            const allSelectedRowsEditing = Array.from(selectedRows).every(rowIdx => 
              editingCells.has(`row-${rowIdx}`)
            )
            
            return (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-[#3658c1] border border-[#c6c8cc] rounded-[16px] px-4 py-2 flex items-center gap-4 shadow-lg">
                  <span
                    className="text-[14px] text-white font-normal leading-[20.5px] tracking-[0.5px] whitespace-nowrap"
                    style={{ fontFamily: 'SF Pro, sans-serif', fontVariationSettings: "'wdth' 100" }}
                  >
                    ({selectedRows.size}) Seleccionados
                  </span>
                  <div className="h-[38px] w-px bg-[#c6c8cc]"></div>
                  <button
                    className="bg-[#f7f8fa] border border-[#c6c8cc] rounded-[8px] h-8 px-3 flex items-center gap-2 hover:bg-[#f0f1f2] transition-colors"
                    onClick={() => {
                      if (allSelectedRowsEditing) {
                        // Salir del modo edición para todas las filas seleccionadas
                        const newEditingCells = new Set(editingCells)
                        selectedRows.forEach((rowIdx) => {
                          newEditingCells.delete(`row-${rowIdx}`)
                        })
                        setEditingCells(newEditingCells)
                      } else {
                        // Activar modo edición para todas las filas seleccionadas
                        const newEditingCells = new Set(editingCells)
                        selectedRows.forEach((rowIdx) => {
                          newEditingCells.add(`row-${rowIdx}`)
                        })
                        setEditingCells(newEditingCells)
                      }
                    }}
                  >
                    {allSelectedRowsEditing ? (
                      <>
                        <i className="fa-regular fa-check text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                        <span
                          className="text-[14px] text-[#313336] font-bold leading-[20.5px] tracking-[0.5px] whitespace-nowrap"
                          style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 700, fontVariationSettings: "'wdth' 100" }}
                        >
                          Salir de edición
                        </span>
                      </>
                    ) : (
                      <>
                        <i className="fa-regular fa-pen text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                        <span
                          className="text-[14px] text-[#313336] font-bold leading-[20.5px] tracking-[0.5px] whitespace-nowrap"
                          style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 700, fontVariationSettings: "'wdth' 100" }}
                        >
                          Editar Seleccionados
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })()}

          {/* Paginación */}
          <div className="bg-white border-t border-[#c6c8cc] px-4 py-3 flex-shrink-0">
            <div className="flex items-center justify-center w-full gap-4">
              {/* Cantidad de páginas - Izquierda */}
              <p
                className="text-[12px] text-[#6c6e73] leading-[17.5px] tracking-[0.5px] whitespace-nowrap"
                style={{ 
                  fontFamily: 'SF Pro, sans-serif',
                  fontSize: '12px',
                  lineHeight: '17.5px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  color: '#6c6e73'
                }}
              >
                Mostrando página 1 de 200
              </p>

              {/* Controles de navegación - Centro */}
              <div className="flex items-center gap-1">
                {/* Botones de navegación */}
                <Tooltip text="Página anterior">
                  <button className="w-8 h-8 bg-[#f7f8fa] border border-[#c6c8cc] rounded-full flex items-center justify-center hover:bg-[#f0f1f2]">
                    <i className="fa-solid fa-chevron-left text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                  </button>
                </Tooltip>
                <Tooltip text="Primera página">
                  <button className="w-8 h-8 bg-[#f7f8fa] border border-[#c6c8cc] rounded-full flex items-center justify-center hover:bg-[#f0f1f2]">
                    <i className="fa-solid fa-chevrons-left text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                  </button>
                </Tooltip>

                {/* Números de página */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f7f8fa] border border-[#c6c8cc] text-[#4d5054] hover:bg-[#f0f1f2]"
                    style={{ 
                      fontFamily: 'SF Pro, sans-serif', 
                      fontSize: '14px', 
                      lineHeight: '20.5px',
                      fontWeight: 700,
                      color: '#4d5054'
                    }}
                  >
                    {num}
                  </button>
                ))}

                <Tooltip text="Última página">
                  <button className="w-8 h-8 bg-[#f7f8fa] border border-[#c6c8cc] rounded-full flex items-center justify-center hover:bg-[#f0f1f2]">
                    <i className="fa-solid fa-chevrons-right text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                  </button>
                </Tooltip>
                <Tooltip text="Siguiente página">
                  <button className="w-8 h-8 bg-[#f7f8fa] border border-[#c6c8cc] rounded-full flex items-center justify-center hover:bg-[#f0f1f2]">
                    <i className="fa-solid fa-chevron-right text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                  </button>
                </Tooltip>
              </div>

              {/* Dropdown items per page - Derecha */}
              <Tooltip text="Cantidad de filas">
                <div className="flex items-center gap-2">
                  <button className="h-8 px-3 bg-[#f7f8fa] border border-[#c6c8cc] rounded-[8px] flex items-center gap-2 hover:bg-[#f0f1f2]">
                    <span 
                      style={{ 
                        fontFamily: 'SF Pro, sans-serif',
                        fontSize: '14px',
                        lineHeight: '20.5px',
                        fontWeight: 700,
                        color: '#313336'
                      }}
                    >
                      8
                    </span>
                    <i className="fa-solid fa-chevron-down text-[#4d5054]" style={{ fontSize: '16px' }}></i>
                  </button>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
