import React from 'react'

export interface ListItem {
  value: string
  label: string
  icon?: string
}

export interface ListProps {
  title?: string
  items: ListItem[]
  selectedValue?: string
  onSelect?: (value: string) => void
  className?: string
  maxHeight?: string
}

export const List: React.FC<ListProps> = ({
  title = 'Columnas',
  items,
  selectedValue,
  onSelect,
  className = '',
  maxHeight = '300px'
}) => {
  return (
    <div
      className={`bg-white border border-[#c6c8cc] rounded-[12px] overflow-hidden ${className}`}
      style={{
        maxHeight,
        overflowY: 'auto'
      }}
    >
      <div className="flex flex-col gap-2 p-2">
        {/* Title */}
        {title && (
          <>
            <div
              style={{
                fontFamily: 'SF Pro, sans-serif',
                fontSize: '14px',
                lineHeight: '20.5px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                color: '#313336',
                fontVariationSettings: "'wdth' 100"
              }}
            >
              {title}
            </div>
            {/* Divider */}
            <div className="h-px bg-[#c6c8cc] mb-1" />
          </>
        )}

        {/* Items */}
        {items.map((item) => {
          const isSelected = selectedValue === item.value
          
          return (
            <div
              key={item.value}
              onClick={() => onSelect?.(item.value)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-[8px] cursor-pointer transition-colors"
              style={{
                height: '32px',
                backgroundColor: isSelected ? '#f0f1f2' : 'transparent',
                paddingLeft: '8px',
                paddingRight: '8px',
                paddingTop: '6px',
                paddingBottom: '6px'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#f0f1f2'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {/* Icon */}
              {item.icon && (
                <div className="flex items-center justify-center flex-shrink-0">
                  <i
                    className={`fa-regular fa-${item.icon}`}
                    style={{
                      fontSize: '16px',
                      color: '#27292b'
                    }}
                  />
                </div>
              )}

              {/* Label */}
              <div className="flex-1 min-w-0">
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
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

