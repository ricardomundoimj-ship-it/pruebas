// Componente para el icono de elipsis (controles)
export function ControlsElipsis({ className }: { className?: string }) {
  return (
    <div className={`relative ${className || ''}`}>
      <div className="absolute inset-[41.67%_12.5%]">
        <div className="absolute inset-[-25%_-5.56%]">
          <img alt="" className="block max-w-none size-full" src="/6c69f41cfa3595ef476a24f344e4ef46617b51f2.svg" />
        </div>
      </div>
    </div>
  )
}

// Componente para el icono de ojo (ver detalles)
export function RealWorldEye({ className }: { className?: string }) {
  return (
    <div className={`relative ${className || ''}`}>
      <div className="absolute inset-[16.67%_12.5%_16.65%_12.5%]">
        <div className="absolute inset-[-6.25%_-5.56%]">
          <img alt="" className="block max-w-none size-full" src="/5cecef608e7ef883a158582702949fb6bd3d0d82.svg" />
        </div>
      </div>
    </div>
  )
}

// Componente para checkbox
type CheckBoxProps = {
  className?: string
  property1?: 'Default' | 'Hover' | 'Active'
  style?: 'Square' | 'Circle'
}

export function CheckBox({ className, property1 = 'Default', style = 'Square' }: CheckBoxProps) {
  if (property1 === 'Active' && style === 'Square') {
    return (
      <div className={`relative ${className || ''}`}>
        <div className="absolute inset-[6.25%] overflow-clip">
          <div className="absolute inset-[29.17%_20.77%_29.18%_20.89%]">
            <svg width="100%" height="100%" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4L3.5 6.5L9 1" stroke="#3658C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    )
  }
  return <div className={className} />
}

// Componente para el icono de info
export function InfoIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className || ''}`}>
      <img alt="" className="block max-w-none size-full" src="/4e97af2013e326ae9ad33a8fcc7a2948ad6ace2c.svg" />
    </div>
  )
}

