function Sidebar() {
  return (
    <div className="bg-[#efefef] flex flex-col gap-[8px] h-full items-start relative shrink-0 w-[170px]">
      {/* Top */}
      <div className="flex gap-[12px] items-center relative shrink-0 w-[170px]">
        <div className="overflow-clip relative shrink-0 size-[44px]">
          <div className="absolute bottom-1/4 left-[27.27%] right-1/4 top-[27.27%]">
            <img alt="" className="block max-w-none size-full" src="/18b941660fcacfb315b9531ed389ff2b7544c3e1.png" />
          </div>
        </div>
        <div className="basis-0 box-border flex flex-col gap-[10px] grow items-end justify-center min-h-px min-w-px px-[8px] py-0 relative shrink-0">
          <button className="bg-[#efefef] box-border cursor-pointer flex flex-col items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0">
            <div className="overflow-clip relative shrink-0 size-[14px]">
              <img alt="" className="block max-w-none size-full" src="/0d52bbfe4a991609f1ff8a7cfe3cef45869aa7a0.svg" />
            </div>
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_-0.32%]">
          <img alt="" className="block max-w-none size-full" src="/0fd5506be1f6a1e5ffc70d767216f7d86613b751.svg" />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="box-border flex flex-col gap-[12px] items-start px-[8px] py-0 relative shrink-0 w-[170px]">
        {/* Carrito */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex gap-[8px] items-center max-h-[28px] min-h-[28px] relative shrink-0">
                <div className="relative shrink-0 size-[14px]">
                  <img alt="" className="block max-w-none size-full" src="/11fa730f9f71d0e0ca72e05ab7b51324f978fa1e.svg" />
                </div>
                <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#252525] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Carrito</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-0.5px_-0.32%]">
            <img alt="" className="block max-w-none size-full" src="/0fd5506be1f6a1e5ffc70d767216f7d86613b751.svg" />
          </div>
        </div>

        {/* Mapa */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex gap-[8px] items-center max-h-[28px] min-h-[28px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-[14px]">
                  <img alt="" className="block max-w-none size-full" src="/13d2a76e5e64e81606b3e7636c0db709f3ec349f.svg" />
                </div>
                <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#252525] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Mapa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pautado - Active */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <button className="bg-[#3658c1] box-border cursor-pointer flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex gap-[8px] items-center max-h-[28px] min-h-[28px] relative shrink-0">
                <div className="relative shrink-0 size-[14px]">
                  <img alt="" className="block max-w-none size-full" src="/1be6b3a6fa69df0a31c3294d4aa268e1ccffe844.svg" />
                </div>
                <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#f1f4ff] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Pautado</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Separator */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-0.5px_-0.32%]">
            <img alt="" className="block max-w-none size-full" src="/0fd5506be1f6a1e5ffc70d767216f7d86613b751.svg" />
          </div>
        </div>

        {/* Nueva campaña */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex gap-[8px] items-center max-h-[28px] min-h-[28px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-[14px]">
                  <img alt="" className="block max-w-none size-full" src="/18c17f302d0244fe3de596eb595253efa5b83c56.svg" />
                </div>
                <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#252525] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Nueva campaña</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de campañas */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex gap-[8px] items-center max-h-[28px] min-h-[28px] relative shrink-0">
                <div className="relative shrink-0 size-[14px]">
                  <img alt="" className="block max-w-none size-full" src="/19792bde9ac1ff49192942c494dffba799130387.svg" />
                </div>
                <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#252525] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Listado de campañas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modulo de tareas */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex gap-[8px] items-center max-h-[28px] min-h-[28px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-[14px]">
                  <img alt="" className="block max-w-none size-full" src="/1e9ca7f15a1357fec5f177abc4beda4e965bd22c.svg" />
                </div>
                <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#252525] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Modulo de tareas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-0.5px_-0.32%]">
            <img alt="" className="block max-w-none size-full" src="/0fd5506be1f6a1e5ffc70d767216f7d86613b751.svg" />
          </div>
        </div>

        {/* Catálogo */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="basis-0 flex gap-[8px] grow items-center max-h-[28px] min-h-[28px] min-w-px relative shrink-0">
              <div className="relative shrink-0 size-[14px]">
                <img alt="" className="block max-w-none size-full" src="/1f6d01bc7c05806a4176a57f0e0dbba8aafd8c6f.svg" />
              </div>
              <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#252525] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Catálogo</p>
                </div>
              </div>
              <div className="overflow-clip relative shrink-0 size-[14px]">
                <img alt="" className="block max-w-none size-full" src="/200d8c8fe8d10e55b71a147545bf4bf5e3535fee.svg" />
              </div>
            </div>
          </div>
        </div>

        {/* Inventario */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="basis-0 flex gap-[8px] grow items-center max-h-[28px] min-h-[28px] min-w-px relative shrink-0">
              <div className="overflow-clip relative shrink-0 size-[14px]">
                <img alt="" className="block max-w-none size-full" src="/219d9de946ec7a5dfc25c87f7d2b638739571415.svg" />
              </div>
              <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#252525] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Inventario</p>
                </div>
              </div>
              <div className="overflow-clip relative shrink-0 size-[14px]">
                <img alt="" className="block max-w-none size-full" src="/200d8c8fe8d10e55b71a147545bf4bf5e3535fee.svg" />
              </div>
            </div>
          </div>
        </div>

        {/* Herramientas */}
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0 w-full">
            <div className="basis-0 flex gap-[8px] grow items-center max-h-[28px] min-h-[28px] min-w-px relative shrink-0">
              <div className="relative shrink-0 size-[14px]">
                <img alt="" className="block max-w-none size-full" src="/21fb732bfa54745ddfa0b326ba73d2deeb14d427.svg" />
              </div>
              <div className="basis-0 flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#252525] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Herramientas</p>
                </div>
              </div>
              <div className="overflow-clip relative shrink-0 size-[14px]">
                <img alt="" className="block max-w-none size-full" src="/200d8c8fe8d10e55b71a147545bf4bf5e3535fee.svg" />
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-0.5px_-0.32%]">
            <img alt="" className="block max-w-none size-full" src="/0fd5506be1f6a1e5ffc70d767216f7d86613b751.svg" />
          </div>
        </div>
      </div>

      {/* Bottom - User Profile */}
      <div className="basis-0 box-border flex flex-col gap-[12px] grow items-start justify-end min-h-px min-w-px pb-[16px] pt-0 px-[8px] relative shrink-0 w-[170px]">
        <div className="flex gap-[10px] items-center relative shrink-0 w-full">
          <div className="overflow-clip relative rounded-[32px] shrink-0 size-[28px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[32px] size-full" src="/298cc63feb6590be6b8e8fabf54675a2830a307d.png" />
          </div>
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <div className="basis-0 flex flex-col gap-[8px] grow h-full items-start justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#252525] text-[12px] text-nowrap">
              <div className="flex flex-col font-bold justify-center overflow-ellipsis overflow-hidden relative shrink-0">
                <p className="leading-[normal] overflow-ellipsis overflow-hidden text-[12px] text-nowrap whitespace-pre">Juan Almada</p>
              </div>
              <div className="flex flex-col font-normal justify-center overflow-ellipsis overflow-hidden relative shrink-0">
                <p className="leading-[normal] overflow-ellipsis overflow-hidden text-[12px] text-nowrap whitespace-pre">Admin</p>
              </div>
            </div>
          </div>
          <div className="bg-[#efefef] box-border flex flex-col h-[28px] items-center justify-center max-h-[50px] min-h-[28px] min-w-[28px] px-[7px] py-0 relative rounded-[8px] shrink-0">
            <div className="overflow-clip relative shrink-0 size-[14px]">
              <img alt="" className="block max-w-none size-full" src="/239fd56e1a298a4b205880518586ce3477537691.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

