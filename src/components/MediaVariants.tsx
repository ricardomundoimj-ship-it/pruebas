import { useState } from 'react'
import { ControlsElipsis, RealWorldEye, CheckBox, InfoIcon } from './Icons'

// Componente para el tooltip
function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#131313] text-white text-[11px] rounded whitespace-nowrap z-50">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#131313]" />
        </div>
      )}
    </div>
  )
}

function MediaVariants() {
  const [openCards, setOpenCards] = useState({
    plaza: false,
    fechas: false,
    plazoBonus: true, // Abierto por defecto según el diseño
    renta: false,
    extras: false,
    comision: false,
    resumen: false,
  })

  const [diasBonus, setDiasBonus] = useState(0)
  const [fraccionarPorHora, setFraccionarPorHora] = useState(false)
  const [horasAsignadas, setHorasAsignadas] = useState(0)
  const [horasBonus, setHorasBonus] = useState(0)
  
  const plazoDias = 30 // 1 Mes = 30 días
  const horasPorDia = 18 // 1 día = 18 horas
  const horasPlazo = plazoDias * horasPorDia // 540 horas
  const costoPartner = 500 // Costo fijo
  const costoHoras = 5000 // Costo de horas fijo

  const toggleCard = (cardName: keyof typeof openCards) => {
    setOpenCards(prev => ({
      ...prev,
      [cardName]: !prev[cardName],
    }))
  }

  const handleDiasBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setDiasBonus(value)
  }

  const handleHorasAsignadasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    // No permitir que exceda las horas del plazo
    const horasValidas = Math.min(value, horasPlazo)
    setHorasAsignadas(horasValidas)
  }

  const incrementarHoras = () => {
    if (horasAsignadas < horasPlazo) {
      setHorasAsignadas(prev => Math.min(prev + 1, horasPlazo))
    }
  }

  const decrementarHoras = () => {
    if (horasAsignadas > 0) {
      setHorasAsignadas(prev => Math.max(prev - 1, 0))
    }
  }

  const handleHorasBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setHorasBonus(value)
  }

  const handleFraccionarPorHoraChange = () => {
    setFraccionarPorHora(!fraccionarPorHora)
    // Si se activa, inicializar las horas asignadas con las horas del plazo
    if (!fraccionarPorHora) {
      setHorasAsignadas(horasPlazo)
    }
  }

  const plazoMenosBonus = Math.max(0, plazoDias - diasBonus)
  const horasACobrar = Math.max(0, horasAsignadas - horasBonus) // Las horas a cobrar son las asignadas menos las horas bonus

  return (
    <div className="flex gap-[16px] items-start relative w-full max-w-[1400px]">
      {/* Card de Medio Seleccionado */}
      <div className="bg-[#f2fff9] border-2 border-[#039b59] border-solid relative rounded-[8px] self-stretch shrink-0 w-[200px]">
        <div className="box-border flex flex-col h-full items-center justify-between overflow-clip px-[12px] py-[13px] relative rounded-[inherit]">
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <CheckBox className="bg-neutral-50 border border-[#929292] border-solid rounded-[2px] shrink-0 size-[16px]" />
            <div className="flex flex-col items-start relative shrink-0">
              <div className="bg-[#22c55e] box-border flex flex-col gap-[0px] h-[20px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[8px] shrink-0">
                <div className="box-border flex gap-[4px] items-center justify-center p-[0px] relative shrink-0">
                  <div className="box-border flex items-center justify-center p-[0px] relative shrink-0">
                    <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 size-[10px] text-[10px] text-white text-center">
                      <p className="leading-[normal]">✓</p>
                    </div>
                  </div>
                  <p className="font-semibold leading-[17.5px] relative shrink-0 text-white text-[12px] text-nowrap tracking-[0.5px] whitespace-pre">
                    Exclusivo
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 flex flex-col gap-[16px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
            <p className="font-semibold leading-[normal] min-w-full relative shrink-0 text-[#4f4f4f] text-[13px] text-center w-[min-content]">
              Pantalla Digital
            </p>
            <div className="flex gap-[10px] items-center justify-center relative shrink-0 w-full">
              <p className="font-bold leading-[normal] relative shrink-0 text-[#252525] text-[16px] text-nowrap whitespace-pre">
                IMJ-CDMX-XXX-X-XXXXX
              </p>
            </div>
            <div className="flex gap-[7px] items-center justify-center relative shrink-0">
              <RealWorldEye className="relative shrink-0 size-[19.062px]" />
              <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#3658c1] text-[13px] text-center text-nowrap">
                <p className="leading-[normal] whitespace-pre">Ver detalles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fila con Tabs */}
      <div className="basis-0 flex flex-col gap-[16px] grow items-start min-h-px min-w-px overflow-x-auto overflow-y-clip relative shrink-0">
        <div className="bg-[#efefef] box-border flex flex-col gap-[16px] items-start pb-[16px] pt-[10px] px-[16px] relative rounded-[8px] shrink-0 w-full">
          {/* Header de la fila */}
          <div className="flex gap-[10px] items-center relative shrink-0">
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[270deg]">
                <ControlsElipsis className="relative size-[24px]" />
              </div>
            </div>
            <CheckBox className="bg-neutral-50 border border-[#929292] border-solid rounded-[2px] shrink-0 size-[16px]" />
            <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className="ml-0 mt-0 relative size-[36px]">
                <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
              </div>
            </button>
          </div>

          {/* Tabs horizontales */}
          <div className="flex gap-[16px] items-start relative rounded-[8px] shrink-0 w-full">
            {/* Plaza Tab */}
            <div className={`bg-neutral-50 box-border flex gap-[16px] items-start ${openCards.plaza ? 'overflow-clip' : 'overflow-visible'} p-[16px] relative rounded-[8px] shrink-0 transition-all duration-200 h-[276px] ${openCards.plaza ? 'w-auto min-w-[180px]' : 'w-[60px]'}`}>
              {openCards.plaza ? (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full">
                  <div className="flex-none h-full w-full">
                    <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                      <div className="flex items-center justify-between relative shrink-0 w-full">
                        <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px]">
                          Plaza
                        </p>
                        <button 
                          onClick={() => toggleCard('plaza')}
                          className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                        >
                          <div className="ml-0 mt-0 relative size-[36px] rotate-90">
                            <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        {/* Contenido de Plaza cuando está abierta */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full pointer-events-none">
                  <div className="flex h-full items-center justify-center relative shrink-0 w-[36px] pointer-events-none">
                    <div className="flex-none h-full rotate-[270deg] origin-center pointer-events-none">
                      <div className="flex flex-col gap-[31px] h-full items-start justify-center relative w-[244.195px] pointer-events-none">
                        <div className="flex items-center justify-between relative shrink-0 w-full pointer-events-auto">
                          <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-[48px]">
                            Plaza
                          </p>
                          <button 
                            onClick={() => toggleCard('plaza')}
                            className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 z-10"
                          >
                            <div className="ml-0 mt-0 relative size-[36px]">
                              <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fechas Tab */}
            <div className={`bg-neutral-50 box-border flex gap-[16px] items-start ${openCards.fechas ? 'overflow-clip' : 'overflow-visible'} p-[16px] relative rounded-[8px] shrink-0 transition-all duration-200 h-[276px] ${openCards.fechas ? 'w-auto min-w-[180px]' : 'w-[60px]'}`}>
              {openCards.fechas ? (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full">
                  <div className="flex-none h-full w-full">
                    <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                      <div className="flex items-center justify-between relative shrink-0 w-full">
                        <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px]">
                          Fechas
                        </p>
                        <button 
                          onClick={() => toggleCard('fechas')}
                          className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                        >
                          <div className="ml-0 mt-0 relative size-[36px] rotate-90">
                            <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        {/* Contenido de Fechas cuando está abierta */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full pointer-events-none">
                  <div className="flex h-full items-center justify-center relative shrink-0 w-[36px] pointer-events-none">
                    <div className="flex-none h-full rotate-[270deg] origin-center pointer-events-none">
                      <div className="flex flex-col gap-[31px] h-full items-start justify-center relative w-[244.195px] pointer-events-none">
                        <div className="flex items-center justify-between relative shrink-0 w-full pointer-events-auto">
                          <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-[48px]">
                            Fechas
                          </p>
                          <button 
                            onClick={() => toggleCard('fechas')}
                            className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 z-10"
                          >
                            <div className="ml-0 mt-0 relative size-[36px]">
                              <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Plazo y Bonus Tab */}
            <div className={`bg-neutral-50 box-border flex gap-[16px] items-start ${openCards.plazoBonus ? 'overflow-clip' : 'overflow-visible'} p-[16px] relative rounded-[8px] shrink-0 transition-all duration-200 h-[276px] ${openCards.plazoBonus ? 'w-auto min-w-[380px]' : 'w-[60px]'}`}>
              {openCards.plazoBonus ? (
                <div className="flex flex-col gap-[16px] h-full items-start relative shrink-0 w-full">
                  {/* Header */}
                  <div className="flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                      Plazo y Bonus
                    </p>
                    <button 
                      onClick={() => toggleCard('plazoBonus')}
                      className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                    >
                      <div className="ml-0 mt-0 relative size-[36px] rotate-90">
                        <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                      </div>
                    </button>
                  </div>

                  {/* Contenido - Interfaz según fraccionarPorHora */}
                  {fraccionarPorHora ? (
                    <>
                      {/* Plazo con horas */}
                      <div className="flex gap-[4px] items-start leading-[normal] relative shrink-0 text-nowrap w-[156.839px] whitespace-pre">
                        <p className="font-semibold relative shrink-0 text-[#131313] text-[13px]">
                          Plazo
                        </p>
                        <p className="font-bold relative shrink-0 text-[#3658c1] text-[12px]">
                          1 Mes
                        </p>
                        <p className="font-semibold opacity-50 relative shrink-0 text-[#3658c1] text-[12px]">
                          ({horasPlazo} h)
                        </p>
                      </div>

                      {/* Contenido de horas */}
                      <div className="basis-0 flex gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
                        {/* Left Column - Asignadas y A cobrar */}
                        <div className="flex flex-col items-start justify-between relative self-stretch shrink-0">
                          <div className="basis-0 flex flex-col grow items-start justify-between min-h-px min-w-px relative shrink-0 w-[156.839px]">
                            {/* Asignadas */}
                            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                              <div className="flex gap-[8px] items-center relative shrink-0 w-full">
                                <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                                  Asignadas
                                </p>
                                <Tooltip text="cada dia equivale a 18hrs">
                                  <div className="relative shrink-0 size-[12.916px] cursor-pointer">
                                    <InfoIcon className="size-full" />
                                  </div>
                                </Tooltip>
                              </div>
                              <div className="bg-[#efefef] box-border flex gap-[4px] h-[40px] items-center min-h-[40px] px-[16px] py-[14px] relative rounded-[8px] shrink-0 w-full">
                                <input
                                  type="number"
                                  value={horasAsignadas || ''}
                                  onChange={handleHorasAsignadasChange}
                                  max={horasPlazo}
                                  min={0}
                                  className="bg-transparent border-none outline-none text-center font-semibold text-[13px] text-[#131313] p-0 m-0 w-auto min-w-[20px] max-w-[40px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  style={{ width: `${String(horasAsignadas || horasPlazo).length * 8 + 8}px` }}
                                />
                                <span className="font-semibold text-[13px] text-[#131313] opacity-50 whitespace-nowrap">
                                  de {horasPlazo} h
                                </span>
                                <div className="flex flex-col gap-0 items-center relative shrink-0 ml-auto">
                                  <button
                                    type="button"
                                    onClick={incrementarHoras}
                                    disabled={horasAsignadas >= horasPlazo}
                                    className="cursor-pointer flex items-center justify-center relative shrink-0 h-[10px] w-[6px] disabled:opacity-30"
                                  >
                                    <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0.5 2.5L3 0.5L5.5 2.5" stroke="#131313" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={decrementarHoras}
                                    disabled={horasAsignadas <= 0}
                                    className="cursor-pointer flex items-center justify-center relative shrink-0 h-[10px] w-[6px] disabled:opacity-30"
                                  >
                                    <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0.5 0.5L3 2.5L5.5 0.5" stroke="#131313" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                </div>
                                <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_4px_0px_inset_rgba(0,0,0,0.15)]" />
                              </div>
                            </div>

                            {/* A cobrar */}
                            <div className="flex flex-col gap-[15px] items-start leading-[normal] relative shrink-0 w-[156.839px]">
                              <p className="font-semibold h-[9px] relative shrink-0 text-[#131313] text-[13px] w-full">
                                A cobrar
                              </p>
                              <p className="font-normal relative shrink-0 text-[#484848] text-[16px] w-full">
                                {horasACobrar} h
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="relative self-stretch shrink-0 w-0">
                          <div className="absolute bottom-0 left-0 right-0 top-0 border-l border-[#efefef]" />
                        </div>

                        {/* Right Column - Bonus */}
                        <div className="flex flex-col gap-[16px] items-start relative shrink-0">
                          <div className="flex flex-col gap-[15px] items-start relative shrink-0 w-[156.839px]">
                            <p className="font-semibold h-[9px] leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-full">
                              Bonus
                            </p>
                            <div className="bg-[#efefef] box-border flex gap-[4px] h-[40px] items-center min-h-[40px] px-[16px] py-[14px] relative rounded-[8px] shrink-0 w-full">
                              <input
                                type="number"
                                value={horasBonus || ''}
                                onChange={handleHorasBonusChange}
                                placeholder="0"
                                className="flex flex-col font-semibold justify-center leading-[0] bg-transparent border-none outline-none overflow-ellipsis overflow-hidden relative shrink-0 text-[#131313] text-[13px] text-nowrap"
                                style={{ opacity: horasBonus === 0 ? 0.5 : 1 }}
                              />
                              <div className="basis-0 flex flex-col font-semibold grow justify-center leading-[0] min-h-px min-w-px opacity-50 overflow-ellipsis overflow-hidden relative shrink-0 text-[#131313] text-[13px] text-nowrap">
                                <p className="leading-[normal] overflow-ellipsis overflow-hidden">h</p>
                              </div>
                              <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_4px_0px_inset_rgba(0,0,0,0.15)]" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-[15px] items-start relative shrink-0 w-[156.839px]">
                            <div className="flex flex-col gap-[15px] items-start leading-[normal] relative shrink-0 w-[156.839px]">
                              <p className="font-semibold h-[9px] relative shrink-0 text-[#131313] text-[13px] w-full">
                                Costo de horas
                              </p>
                              <p className="font-normal relative shrink-0 text-[#484848] text-[16px] w-full">
                                ${costoHoras.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="basis-0 flex gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
                      {/* Left Column - Plazo */}
                      <div className="flex flex-col gap-[16px] h-full items-start relative shrink-0">
                        <div className="flex flex-col gap-[16px] items-start relative shrink-0">
                          <div className="flex flex-col gap-[15px] items-start relative shrink-0 w-[156.839px]">
                            <div className="flex flex-col gap-[7px] items-start leading-[normal] relative shrink-0 text-[13px] w-full">
                              <p className="font-semibold h-[9px] relative shrink-0 text-[#131313] w-full">
                                Plazo
                              </p>
                              <p className="font-bold h-[9px] relative shrink-0 text-[#3658c1] w-full whitespace-pre-wrap">{`1  Mes `}</p>
                            </div>
                          </div>
                        </div>
                        {/* Plazo (menos bonus) - Solo visible cuando hay días bonus */}
                        {diasBonus > 0 && (
                          <div className="flex flex-col gap-[16px] items-start relative shrink-0">
                            <div className="flex flex-col gap-[15px] items-start relative shrink-0 w-[156.839px]">
                              <div className="flex flex-col gap-[7px] items-start leading-[normal] relative shrink-0 text-[13px] w-full">
                                <p className="font-semibold h-[9px] relative shrink-0 text-[#131313] w-full">
                                  Plazo (menos bonus)
                                </p>
                                <p className="font-bold h-[9px] relative shrink-0 text-[#3658c1] w-full">{`${plazoMenosBonus} Días `}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="h-full relative shrink-0 w-0">
                        <div className="absolute bottom-0 left-0 right-0 top-0 border-l border-[#efefef]" />
                      </div>

                      {/* Right Column - Bonus */}
                      <div className="flex flex-col h-full items-start justify-between relative shrink-0">
                        <div className="flex flex-col gap-[15px] items-start relative shrink-0 w-[156.839px]">
                          <p className="font-semibold h-[9px] leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-full">
                            Días bonus
                          </p>
                          <div className="bg-[#efefef] box-border flex gap-[8px] h-[40px] items-center min-h-[40px] px-[16px] py-[14px] relative rounded-[8px] shrink-0 w-full">
                            <input
                              type="number"
                              value={diasBonus || ''}
                              onChange={handleDiasBonusChange}
                              placeholder="0"
                              className="flex flex-col font-semibold justify-center leading-[0] bg-transparent border-none outline-none overflow-ellipsis overflow-hidden relative shrink-0 text-[#131313] text-[13px] text-nowrap w-full"
                              style={{ opacity: diasBonus === 0 ? 0.5 : 1 }}
                            />
                            <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_4px_0px_inset_rgba(0,0,0,0.15)]" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-[15px] items-start leading-[normal] relative shrink-0 w-[156.839px]">
                          <p className="font-semibold h-[9px] relative shrink-0 text-[#131313] text-[13px] w-full">
                            Costo de partner
                          </p>
                          <p className="font-normal relative shrink-0 text-[#484848] text-[16px] w-full">
                            ${costoPartner.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-0 border-t border-[#efefef]" />
                  </div>

                  {/* Fraction Checkbox */}
                  <div className="flex gap-[4px] items-center justify-center relative shrink-0 w-full">
                    <button
                      onClick={handleFraccionarPorHoraChange}
                      className="cursor-pointer"
                    >
                      <CheckBox 
                        className={`bg-neutral-50 border ${fraccionarPorHora ? 'border-[#3658c1]' : 'border-[#929292]'} border-solid rounded-[2px] shrink-0 size-[16px]`}
                        property1={fraccionarPorHora ? 'Active' : 'Default'}
                      />
                    </button>
                    <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">
                      Fraccionar por hora
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full pointer-events-none">
                  <div className="flex h-full items-center justify-center relative shrink-0 w-[36px] pointer-events-none">
                    <div className="flex-none h-full rotate-[270deg] origin-center pointer-events-none">
                      <div className="flex flex-col gap-[31px] h-full items-start justify-center relative w-[244.195px] pointer-events-none">
                        <div className="flex items-center justify-between relative shrink-0 w-full pointer-events-auto">
                          <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                            Plazo y Bonus
                          </p>
                          <button 
                            onClick={() => toggleCard('plazoBonus')}
                            className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 z-10"
                          >
                            <div className="ml-0 mt-0 relative size-[36px]">
                              <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Renta Tab */}
            <div className={`bg-neutral-50 box-border flex gap-[16px] items-start ${openCards.renta ? 'overflow-clip' : 'overflow-visible'} p-[16px] relative rounded-[8px] shrink-0 transition-all duration-200 h-[276px] ${openCards.renta ? 'w-auto min-w-[180px]' : 'w-[60px]'}`}>
              {openCards.renta ? (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full">
                  <div className="flex-none h-full w-full">
                    <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                      <div className="flex items-center justify-between relative shrink-0 w-full">
                        <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px]">
                          Renta
                        </p>
                        <button 
                          onClick={() => toggleCard('renta')}
                          className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                        >
                          <div className="ml-0 mt-0 relative size-[36px] rotate-90">
                            <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        {/* Contenido de Renta cuando está abierta */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full pointer-events-none">
                  <div className="flex h-full items-center justify-center relative shrink-0 w-[36px] pointer-events-none">
                    <div className="flex-none h-full rotate-[270deg] origin-center pointer-events-none">
                      <div className="flex flex-col gap-[31px] h-full items-start justify-center relative w-[244.195px] pointer-events-none">
                        <div className="flex items-center justify-between relative shrink-0 w-full pointer-events-auto">
                          <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-[48px]">
                            Renta
                          </p>
                          <button 
                            onClick={() => toggleCard('renta')}
                            className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 z-10"
                          >
                            <div className="ml-0 mt-0 relative size-[36px]">
                              <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Extras Tab */}
            <div className={`bg-neutral-50 box-border flex gap-[16px] items-start ${openCards.extras ? 'overflow-clip' : 'overflow-visible'} p-[16px] relative rounded-[8px] shrink-0 transition-all duration-200 h-[276px] ${openCards.extras ? 'w-auto min-w-[180px]' : 'w-[60px]'}`}>
              {openCards.extras ? (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full">
                  <div className="flex-none h-full w-full">
                    <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                      <div className="flex items-center justify-between relative shrink-0 w-full">
                        <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px]">
                          Extras
                        </p>
                        <button 
                          onClick={() => toggleCard('extras')}
                          className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                        >
                          <div className="ml-0 mt-0 relative size-[36px] rotate-90">
                            <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        {/* Contenido de Extras cuando está abierta */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full pointer-events-none">
                  <div className="flex h-full items-center justify-center relative shrink-0 w-[36px] pointer-events-none">
                    <div className="flex-none h-full rotate-[270deg] origin-center pointer-events-none">
                      <div className="flex flex-col gap-[31px] h-full items-start justify-center relative w-[244.195px] pointer-events-none">
                        <div className="flex items-center justify-between relative shrink-0 w-full pointer-events-auto">
                          <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-[48px]">
                            Extras
                          </p>
                          <button 
                            onClick={() => toggleCard('extras')}
                            className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 z-10"
                          >
                            <div className="ml-0 mt-0 relative size-[36px]">
                              <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Comisión de agencia Tab */}
            <div className={`bg-neutral-50 box-border flex gap-[16px] items-start ${openCards.comision ? 'overflow-clip' : 'overflow-visible'} p-[16px] relative rounded-[8px] shrink-0 transition-all duration-200 h-[276px] ${openCards.comision ? 'w-auto min-w-[180px]' : 'w-[60px]'} ${!openCards.comision ? 'z-10' : ''}`}>
              {openCards.comision ? (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full">
                  <div className="flex-none h-full w-full">
                    <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                      <div className="flex items-center justify-between relative shrink-0 w-full">
                        <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                          Comisión de agencia
                        </p>
                        <button 
                          onClick={() => toggleCard('comision')}
                          className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                        >
                          <div className="ml-0 mt-0 relative size-[36px] rotate-90">
                            <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        {/* Contenido de Comisión cuando está abierta */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full pointer-events-none z-20">
                  <div className="flex h-full items-center justify-center relative shrink-0 w-[36px] pointer-events-none">
                    <div className="flex-none h-full rotate-[270deg] origin-center pointer-events-none">
                      <div className="flex flex-col gap-[31px] h-full items-start justify-center relative w-[244.195px] pointer-events-none">
                        <div className="flex items-center justify-between relative shrink-0 w-full pointer-events-auto z-30">
                          <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre pointer-events-none">
                            Comisión de agencia
                          </p>
                          <button 
                            onClick={() => toggleCard('comision')}
                            className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 z-40"
                          >
                            <div className="ml-0 mt-0 relative size-[36px] pointer-events-auto">
                              <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resumen Tab */}
            <div className={`bg-neutral-50 box-border flex gap-[16px] items-start ${openCards.resumen ? 'overflow-clip' : 'overflow-visible'} p-[16px] relative rounded-[8px] shrink-0 transition-all duration-200 h-[276px] ${openCards.resumen ? 'w-auto min-w-[180px]' : 'w-[60px]'}`}>
              {openCards.resumen ? (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full">
                  <div className="flex-none h-full w-full">
                    <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                      <div className="flex items-center justify-between relative shrink-0 w-full">
                        <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                          Resumen
                        </p>
                        <button 
                          onClick={() => toggleCard('resumen')}
                          className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                        >
                          <div className="ml-0 mt-0 relative size-[36px] rotate-90">
                            <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        {/* Contenido de Resumen cuando está abierta */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center relative shrink-0 w-full">
                  <div className="flex h-full items-center justify-center relative shrink-0 w-[36px]">
                    <div className="flex-none h-full rotate-[270deg] origin-center">
                      <div className="flex flex-col gap-[31px] h-full items-start justify-center relative w-[244.195px]">
                        <div className="flex items-center justify-between relative shrink-0 w-full">
                          <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                            Resumen
                          </p>
                          <button 
                            onClick={() => toggleCard('resumen')}
                            className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                          >
                            <div className="ml-0 mt-0 relative size-[36px]">
                              <img alt="" className="block max-w-none size-full" src="/7676cbcff1dcfd142a1b648c6599f2df188410ca.svg" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaVariants
