function DetailView() {
  return (
    <div className="basis-0 flex flex-col gap-[16px] grow items-start min-h-px min-w-px overflow-x-auto overflow-y-clip relative shrink-0">
      {/* Row Container */}
      <div className="bg-[#efefef] box-border flex flex-col gap-[16px] items-start pb-[16px] pt-[10px] px-[16px] relative rounded-[8px] shrink-0 w-full">
        {/* Row Header */}
        <div className="flex gap-[10px] items-center relative shrink-0">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[270deg]">
              <div className="relative size-[24px]">
                <img alt="" className="block max-w-none size-full" src="/55a2b1394a934eaaa7fef5d36421b501ceeb8327.svg" />
              </div>
            </div>
          </div>
          <button className="bg-neutral-50 block border border-[#929292] border-solid cursor-pointer relative rounded-[2px] shrink-0 size-[16px]" />
          <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="ml-0 mt-0 relative size-[36px]">
              <img alt="" className="block max-w-none size-full" src="/56f7b4183aeeed0a6ca1751974e5ec8efa5cc579.svg" />
            </div>
          </button>
        </div>

        {/* Tabs Row */}
        <div className="flex gap-[16px] items-start relative rounded-[8px] shrink-0 w-full">
          {/* Plaza Tab */}
          <div className="bg-neutral-50 box-border flex gap-[16px] items-start overflow-clip p-[16px] relative rounded-[8px] self-stretch shrink-0 w-[180px]">
            <div className="flex h-full items-center justify-center relative shrink-0">
              <div className="flex-none h-full rotate-[270deg]">
                <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                  <div className="flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-[48px]">
                      Plaza
                    </p>
                    <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="ml-0 mt-0 relative size-[36px]">
                        <img alt="" className="block max-w-none size-full" src="/56f7b4183aeeed0a6ca1751974e5ec8efa5cc579.svg" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fechas Tab */}
          <div className="bg-neutral-50 box-border flex gap-[16px] items-start overflow-clip p-[16px] relative rounded-[8px] self-stretch shrink-0">
            <div className="flex h-full items-center justify-center relative shrink-0">
              <div className="flex-none h-full rotate-[270deg]">
                <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                  <div className="flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-[48px]">
                      Fechas
                    </p>
                    <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="ml-0 mt-0 relative size-[36px]">
                        <img alt="" className="block max-w-none size-full" src="/56f7b4183aeeed0a6ca1751974e5ec8efa5cc579.svg" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plazo y Bonus Tab - Active */}
          <div className="bg-neutral-50 box-border flex gap-[16px] h-[276px] items-start overflow-clip p-[16px] relative rounded-[8px] shrink-0">
            <div className="flex flex-col gap-[16px] items-start relative shrink-0">
              {/* Header */}
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                  Plazo y Bonus
                </p>
                <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                  <div className="ml-0 mt-0 relative size-[36px]">
                    <img alt="" className="block max-w-none size-full" src="/56f7b4183aeeed0a6ca1751974e5ec8efa5cc579.svg" />
                  </div>
                </button>
              </div>

              {/* Plazo Info */}
              <div className="flex gap-[4px] items-start leading-[normal] relative shrink-0 text-nowrap w-[156.839px] whitespace-pre">
                <p className="font-semibold relative shrink-0 text-[#131313] text-[13px]">Plazo</p>
                <p className="font-bold relative shrink-0 text-[#3658c1] text-[12px]">1 Mes</p>
                <p className="font-semibold opacity-50 relative shrink-0 text-[#3658c1] text-[12px]">(540 h)</p>
              </div>

              {/* Content */}
              <div className="flex gap-[16px] items-start relative shrink-0">
                {/* Left Column */}
                <div className="flex flex-col items-start justify-between relative self-stretch shrink-0">
                  <div className="basis-0 flex flex-col grow items-start justify-between min-h-px min-w-px relative shrink-0 w-[156.839px]">
                    <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="flex gap-[8px] items-center relative shrink-0 w-full">
                        <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                          Asignadas
                        </p>
                        <div className="relative shrink-0 size-[12.916px]">
                          <img alt="" className="block max-w-none size-full" src="/583c99f9a14baf5589f4496a9bac91e2d5261e8e.svg" />
                        </div>
                      </div>
                      <div className="bg-[#efefef] box-border flex flex-col gap-[8px] items-end justify-center min-h-[40px] p-[14px] relative rounded-[8px] shrink-0 w-full">
                        <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                          <div className="flex flex-col font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#131313] text-[13px] text-center text-nowrap">
                            <p className="leading-[0px] overflow-ellipsis overflow-hidden whitespace-pre">540</p>
                          </div>
                          <div className="basis-0 flex flex-col font-semibold grow justify-center leading-[0] min-h-px min-w-px opacity-50 overflow-ellipsis overflow-hidden relative shrink-0 text-[#131313] text-[13px] text-nowrap">
                            <p className="leading-[0px] overflow-ellipsis overflow-hidden">de 540 h</p>
                          </div>
                          <div className="h-[9px] relative shrink-0 w-[6px]">
                            <img alt="" className="block max-w-none size-full" src="/5ab17fc2e20fdc90f6c12d506b3a1a309eb95175.svg" />
                          </div>
                        </div>
                        <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_4px_0px_inset_rgba(0,0,0,0.15)]" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[15px] items-start leading-[normal] relative shrink-0 w-[156.839px]">
                      <p className="font-semibold h-[9px] relative shrink-0 text-[#131313] text-[13px] w-full">
                        A cobrar
                      </p>
                      <p className="font-normal relative shrink-0 text-[#484848] text-[16px] w-full">520 h</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative self-stretch shrink-0 w-0">
                  <div className="absolute bottom-0 left-[-1.5px] right-[-1.5px] top-[-1.34%]">
                    <img alt="" className="block max-w-none size-full" src="/5cecef608e7ef883a158582702949fb6bd3d0d82.svg" />
                  </div>
                </div>

                {/* Right Column - Bonus */}
                <div className="flex flex-col gap-[16px] items-start relative shrink-0">
                  <div className="flex flex-col h-[60.365px] items-start justify-between relative shrink-0 w-[156.839px]">
                    <p className="font-semibold h-[9px] leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-full">
                      Bonus
                    </p>
                    <div className="bg-[#efefef] box-border flex gap-[4px] h-[40px] items-center min-h-[40px] px-[16px] py-[14px] relative rounded-[8px] shrink-0 w-full">
                      <div className="flex flex-col font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#131313] text-[13px] text-nowrap">
                        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">20</p>
                      </div>
                      <div className="basis-0 flex flex-col font-semibold grow justify-center leading-[0] min-h-px min-w-px opacity-50 overflow-ellipsis overflow-hidden relative shrink-0 text-[#131313] text-[13px] text-nowrap">
                        <p className="leading-[normal] overflow-ellipsis overflow-hidden">h</p>
                      </div>
                      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_4px_0px_inset_rgba(0,0,0,0.15)]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[15px] items-start relative shrink-0 w-[156.839px]">
                    <p className="font-semibold h-[9px] relative shrink-0 text-[#131313] text-[13px] w-full">
                      Costo de horas
                    </p>
                    <p className="font-normal relative shrink-0 text-[#484848] text-[16px] w-full">$5,000.00</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                  <img alt="" className="block max-w-none size-full" src="/5e37ab662bcaa514afcc6cb42330161ead666150.svg" />
                </div>
              </div>

              {/* Fraction Checkbox */}
              <div className="flex gap-[4px] items-center justify-center relative shrink-0 w-full">
                <button className="bg-neutral-50 block border border-[#3658c1] border-solid cursor-pointer relative rounded-[2px] shrink-0 size-[16px]">
                  <div className="absolute inset-[6.25%] overflow-clip">
                    <div className="absolute inset-[29.17%_20.77%_29.18%_20.89%]">
                      <img alt="" className="block max-w-none size-full" src="/611aa76389400948d207e5271c20468dd29ce3db.png" />
                    </div>
                  </div>
                </button>
                <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">
                  Fraccionar por hora
                </p>
              </div>
            </div>
          </div>

          {/* Renta Tab */}
          <div className="bg-neutral-50 box-border flex gap-[16px] items-start overflow-clip p-[16px] relative rounded-[8px] self-stretch shrink-0">
            <div className="flex h-full items-center justify-center relative shrink-0">
              <div className="flex-none h-full rotate-[270deg]">
                <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                  <div className="flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                      Renta
                    </p>
                    <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="ml-0 mt-0 relative size-[36px]">
                        <img alt="" className="block max-w-none size-full" src="/56f7b4183aeeed0a6ca1751974e5ec8efa5cc579.svg" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Extras Tab */}
          <div className="bg-neutral-50 box-border flex gap-[16px] items-start overflow-clip p-[16px] relative rounded-[8px] self-stretch shrink-0">
            <div className="flex h-full items-center justify-center relative shrink-0">
              <div className="flex-none h-full rotate-[270deg]">
                <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                  <div className="flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] w-[48px]">
                      Extras
                    </p>
                    <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="ml-0 mt-0 relative size-[36px]">
                        <img alt="" className="block max-w-none size-full" src="/56f7b4183aeeed0a6ca1751974e5ec8efa5cc579.svg" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comisión de agencia Tab */}
          <div className="bg-neutral-50 box-border flex gap-[16px] items-start overflow-clip p-[16px] relative rounded-[8px] self-stretch shrink-0">
            <div className="flex h-full items-center justify-center relative shrink-0">
              <div className="flex-none h-full rotate-[270deg]">
                <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                  <div className="flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                      Comisión de agencia
                    </p>
                    <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="ml-0 mt-0 relative size-[36px]">
                        <img alt="" className="block max-w-none size-full" src="/56f7b4183aeeed0a6ca1751974e5ec8efa5cc579.svg" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen Tab */}
          <div className="bg-neutral-50 box-border flex gap-[16px] items-start overflow-clip p-[16px] relative rounded-[8px] self-stretch shrink-0">
            <div className="flex h-full items-center justify-center relative shrink-0">
              <div className="flex-none h-full rotate-[270deg]">
                <div className="flex flex-col gap-[31px] h-full items-start relative w-[244.195px]">
                  <div className="flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[13px] text-nowrap whitespace-pre">
                      Resumen
                    </p>
                    <button className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="ml-0 mt-0 relative size-[36px]">
                        <img alt="" className="block max-w-none size-full" src="/56f7b4183aeeed0a6ca1751974e5ec8efa5cc579.svg" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailView

