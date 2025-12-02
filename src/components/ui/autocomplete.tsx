import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { List } from './list'

export interface AutocompleteOption {
  value: string
  label: string
  icon?: string
}

export interface AutocompleteProps {
  label?: string
  placeholder?: string
  helpText?: string
  value?: string
  options?: AutocompleteOption[]
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  leftIcon?: string
  showInfoIcon?: boolean
  onSelect?: (value: string) => void
  onClear?: () => void
  className?: string
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  placeholder = 'Seleccionar...',
  helpText,
  value,
  options = [],
  disabled = false,
  error = false,
  errorMessage,
  leftIcon,
  showInfoIcon = false,
  onSelect,
  onClear,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(options)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  
  // Agregar un atributo de datos al dropdown para identificarlo
  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.setAttribute('data-autocomplete-dropdown', 'true')
    }
  }, [isOpen])

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    if (searchTerm) {
      const filtered = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions(options)
    }
  }, [searchTerm, options])

  // Calcular posición del dropdown cuando se abre
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      })
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option: AutocompleteOption) => {
    onSelect?.(option.value)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClear?.()
    setSearchTerm('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true)
    }
  }

  // Determinar el estado visual
  const getState = () => {
    if (disabled) return 'disabled'
    if (error) return 'error'
    if (isOpen && searchTerm) return 'typing'
    if (value) return 'value'
    return 'default'
  }

  const state = getState()

  // Colores según el estado
  const getBorderColor = () => {
    if (state === 'error') return '#ef4444'
    if (state === 'disabled') return '#d4d6d9'
    if (state === 'typing' || (isOpen && !error)) return '#3658c1'
    return '#c6c8cc'
  }

  const getBgColor = () => {
    if (state === 'error') return '#fef1f1'
    if (state === 'disabled') return '#f7f8fa'
    return '#ffffff'
  }

  const getTextColor = () => {
    if (state === 'error') return '#b83434'
    if (state === 'disabled') return '#babcbf'
    if (value || searchTerm) return '#313336'
    return '#6c6e73'
  }

  const getIconColor = () => {
    if (state === 'error') return '#b83434'
    if (state === 'disabled') return '#babcbf'
    if (state === 'typing' || (isOpen && !error)) return '#3251b1'
    return '#4d5054'
  }

  const getLabelColor = () => {
    if (state === 'error') return '#b83434'
    return '#313336'
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Label */}
      {label && (
        <div className="flex items-center gap-2">
          <label
            style={{
              fontFamily: 'SF Pro, sans-serif',
              fontSize: '14px',
              lineHeight: '20.5px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              color: getLabelColor(),
              fontVariationSettings: "'wdth' 100"
            }}
          >
            {label}
          </label>
          {showInfoIcon && (
            <i
              className="fa-regular fa-circle-info"
              style={{
                fontSize: '10px',
                color: state === 'error' ? '#b83434' : '#4d5054'
              }}
            />
          )}
        </div>
      )}

      {/* Input Container */}
      <div className="relative" ref={containerRef}>
        <div
          className="flex items-center w-full"
          style={{
            backgroundColor: getBgColor(),
            border: `1px solid ${getBorderColor()}`,
            borderRadius: '8px',
            padding: '6px 8px',
            gap: '8px',
            minHeight: '32px',
            cursor: disabled ? 'not-allowed' : 'text'
          }}
          onClick={() => {
            if (!disabled) {
              setIsOpen(true)
              setTimeout(() => {
                inputRef.current?.focus()
              }, 0)
            }
          }}
        >
          {/* Left Icon */}
          {leftIcon && (
            <div className="flex items-center justify-center" style={{ padding: '2px' }}>
              <i
                className={`fa-regular fa-${leftIcon}`}
                style={{
                  fontSize: '16px',
                  color: getIconColor()
                }}
              />
            </div>
          )}

          {/* Input/Text */}
          <div className="flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={isOpen ? (searchTerm || (selectedOption ? selectedOption.label : '')) : (selectedOption ? selectedOption.label : '')}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full outline-none bg-transparent"
              style={{
                fontFamily: 'SF Pro, sans-serif',
                fontSize: '14px',
                lineHeight: '20.5px',
                fontWeight: 400,
                letterSpacing: '0.5px',
                color: getTextColor(),
                fontVariationSettings: "'wdth' 100"
              }}
            />
          </div>

          {/* Clear Button (when has value) */}
          {value && !disabled && onClear && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center"
              style={{ padding: '2px' }}
            >
              <i
                className="fa-regular fa-close"
                style={{
                  fontSize: '16px',
                  color: getIconColor()
                }}
              />
            </button>
          )}

          {/* Chevron Icon */}
          <div className="flex items-center justify-center" style={{ padding: '2px' }}>
            <i
              className={`fa-regular fa-chevron-${isOpen && !disabled ? 'up' : 'down'}`}
              style={{
                fontSize: '16px',
                color: getIconColor()
              }}
            />
          </div>
        </div>

        {/* Dropdown - Renderizado con Portal para aparecer por encima de todo */}
        {isOpen && !disabled && createPortal(
          <div 
            ref={dropdownRef}
            data-autocomplete-dropdown="true"
            className="fixed z-[99999]"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            <List
              title="Columnas"
              items={filteredOptions.length > 0 ? filteredOptions.map(opt => ({
                value: opt.value,
                label: opt.label,
                icon: opt.icon
              })) : options.map(opt => ({
                value: opt.value,
                label: opt.label,
                icon: opt.icon
              }))}
              selectedValue={value}
              onSelect={(selectedValue) => {
                const allOptions = filteredOptions.length > 0 ? filteredOptions : options
                const option = allOptions.find(opt => opt.value === selectedValue)
                if (option) {
                  handleSelect(option)
                }
              }}
              maxHeight="300px"
            />
          </div>,
          document.body
        )}
      </div>

      {/* Help Text / Error Message */}
      {(helpText || (error && errorMessage)) && (
        <div
          style={{
            fontFamily: 'SF Pro, sans-serif',
            fontSize: '12px',
            lineHeight: '17.5px',
            fontWeight: 400,
            letterSpacing: '0.5px',
            color: state === 'error' ? '#b83434' : '#6c6e73',
            fontVariationSettings: "'wdth' 100"
          }}
        >
          {error && errorMessage ? errorMessage : helpText}
        </div>
      )}
    </div>
  )
}

