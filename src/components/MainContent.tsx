import InvestmentCards from './InvestmentCards'
import MediaList from './MediaList'
import DetailView from './DetailView'

function MainContent() {
  return (
    <div className="basis-0 bg-neutral-50 box-border flex flex-col gap-[16px] grow isolate items-start min-h-px min-w-px overflow-clip p-[16px] relative rounded-[6px] shrink-0 w-full">
      {/* Tabs - Media Types */}
      <div className="box-border flex items-center justify-between pb-[5px] pl-0 pr-px pt-[10px] relative shrink-0 w-full z-[6]">
        <div className="flex gap-[24px] items-start relative shrink-0">
          <div className="flex gap-[24px] items-center relative shrink-0">
            {/* Sitios Fijos */}
            <div className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex h-[40px] items-center justify-center max-h-[50px] min-h-[28px] relative rounded-[8px] shrink-0">
              <div className="box-border flex gap-[8px] items-center max-h-[40px] min-h-[40px] p-[8px] relative shrink-0">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src="/2de5144932e3807cbfbcaaeedd65c9050a0dce8d.svg" />
                </div>
              </div>
            </div>
            {/* Camiones Urbanos */}
            <div className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex h-[40px] items-center justify-center max-h-[50px] min-h-[28px] relative rounded-[8px] shrink-0">
              <div className="box-border flex gap-[8px] items-center max-h-[40px] min-h-[40px] p-[8px] relative shrink-0">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src="/2f2340e043529eeeaf2313265f835528864f00b5.svg" />
                </div>
              </div>
            </div>
            {/* Medios Indoor */}
            <div className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex h-[40px] items-center justify-center max-h-[50px] min-h-[28px] relative rounded-[8px] shrink-0">
              <div className="box-border flex gap-[8px] items-center max-h-[40px] min-h-[40px] p-[8px] relative shrink-0">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src="/302aa0028ea729192e7075a4cf4c53e06e45a89d.svg" />
                </div>
              </div>
            </div>
            {/* Vallas Móviles */}
            <div className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex h-[40px] items-center justify-center max-h-[50px] min-h-[28px] relative rounded-[8px] shrink-0">
              <div className="box-border flex gap-[8px] items-center max-h-[40px] min-h-[40px] p-[8px] relative shrink-0">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src="/309f28e189ec175a44eb7785066ea103c8dc18d9.svg" />
                </div>
              </div>
            </div>
            {/* Tráfico */}
            <div className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex h-[40px] items-center justify-center max-h-[50px] min-h-[28px] relative rounded-[8px] shrink-0">
              <div className="box-border flex gap-[8px] items-center max-h-[40px] min-h-[40px] p-[8px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src="/326c58bed68f47a881c132fd09c70008f161cdc3.svg" />
                </div>
              </div>
            </div>
            {/* Calculadora - Active */}
            <button className="bg-[#e1ebf9] border border-[#28408f] border-solid box-border cursor-pointer flex h-[40px] items-center justify-center max-h-[50px] min-h-[28px] p-0 relative rounded-[8px] shrink-0">
              <div className="box-border flex gap-[8px] items-center max-h-[40px] min-h-[40px] p-[8px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src="/3b72f9d623ba395b3d5b62955542279001a0f2e7.svg" />
                </div>
              </div>
            </button>
          </div>
          <div className="flex gap-[15px] items-center relative shrink-0">
            <div className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex h-[40px] items-center justify-center max-h-[50px] min-h-[28px] relative rounded-[8px] shrink-0">
              <div className="box-border flex gap-[8px] items-center max-h-[40px] min-h-[40px] p-[8px] relative shrink-0">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src="/3ebff604766a3c4eb444aba56e8929dfd0c38c5f.svg" />
                </div>
              </div>
            </div>
            <div className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex h-[40px] items-center justify-center max-h-[50px] min-h-[28px] relative rounded-[8px] shrink-0">
              <div className="box-border flex gap-[8px] items-center max-h-[40px] min-h-[40px] p-[8px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src="/4146cb695a501a59b3fb73c9c79904903f18c1ce.svg" />
                </div>
              </div>
            </div>
            <div className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex flex-col h-[36px] items-center justify-center max-h-[50px] min-h-[28px] px-[8px] py-0 relative rounded-[27px] shrink-0">
              <div className="overflow-clip relative shrink-0 size-[20px]">
                <img alt="" className="block max-w-none size-full" src="/43033ff45a2533ff731c695c4c2976451753f4b1.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Total and Discounts */}
      <div className="flex items-center justify-between relative shrink-0 w-full z-[5]">
        <div className="flex gap-[8px] items-center relative shrink-0">
          <div className="flex flex-col font-semibold justify-center leading-[normal] relative shrink-0 text-[#131313] text-[16px] w-[214px]">
            <p className="mb-0 text-[16px]">{`Inversion Total: `}</p>
            <p className="text-[#3658c1] text-[14px]">$1,619,670</p>
          </div>
        </div>
        <div className="flex gap-[24px] items-center relative shrink-0">
          <div className="flex gap-[17px] items-center justify-center relative shrink-0">
            <div className="flex gap-[10px] items-center relative shrink-0">
              <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-black text-nowrap">
                <p className="leading-[normal] whitespace-pre">Comisión Adicional</p>
              </div>
              <div className="bg-[#f5f5f5] box-border flex gap-[5px] h-[40px] items-center min-h-[40px] pl-[16px] pr-0 py-[14px] relative rounded-[8px] shrink-0">
                <div className="flex flex-col font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[13px] text-[#252525] text-nowrap w-[33px]">
                  <p className="leading-[normal] overflow-ellipsis overflow-hidden">10</p>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                  <div className="bg-[#e6e9ed] h-[40px] rounded-br-[4px] rounded-tl-[1px] rounded-tr-[4px] w-[44.951px]" />
                  <div className="flex flex-col font-normal h-[24px] justify-center ml-[22.82px] mt-[20.44px] relative text-[14px] text-black text-center translate-x-[-50%] translate-y-[-50%] w-[39.843px]">
                    <p className="leading-[normal]">{`% `}</p>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_4px_0px_inset_rgba(0,0,0,0.15)]" />
              </div>
            </div>
          </div>
          <div className="flex gap-[17px] items-center justify-center relative shrink-0">
            <div className="flex gap-[10px] items-center relative shrink-0">
              <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-black text-nowrap">
                <p className="leading-[normal] whitespace-pre">Descuento Global Final</p>
              </div>
              <div className="bg-[#f5f5f5] box-border flex gap-[5px] h-[40px] items-center min-h-[40px] pl-[16px] pr-0 py-[14px] relative rounded-[8px] shrink-0 w-[99px]">
                <div className="flex flex-col font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[13px] text-[#252525] text-nowrap w-[33px]">
                  <p className="leading-[normal] overflow-ellipsis overflow-hidden">10</p>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                  <div className="bg-[#e6e9ed] h-[40px] rounded-br-[4px] rounded-tl-[1px] rounded-tr-[4px] w-[44.951px]" />
                  <div className="flex flex-col font-normal h-[24px] justify-center ml-[22.82px] mt-[20.44px] relative text-[14px] text-black text-center translate-x-[-50%] translate-y-[-50%] w-[39.843px]">
                    <p className="leading-[normal]">{`% `}</p>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_4px_0px_inset_rgba(0,0,0,0.15)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Cards */}
      <InvestmentCards />

      {/* Discount and Search Section */}
      <div className="flex items-start justify-between relative shrink-0 w-full z-[3]">
        <div className="flex flex-col gap-[15px] items-start justify-center relative shrink-0">
          <div className="flex gap-[15px] items-center relative shrink-0">
            <button className="bg-neutral-50 block border border-[#929292] border-solid cursor-pointer relative rounded-[2px] shrink-0 size-[16px]" />
            <div className="bg-neutral-100 box-border flex gap-[6px] h-[40px] items-center pl-[16px] pr-0 py-[14px] relative rounded-[8px] shrink-0 w-[100px]">
              <div className="flex flex-col font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#252525] text-[13px] text-nowrap w-[33px]">
                <p className="leading-[normal] overflow-ellipsis overflow-hidden">30</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="bg-neutral-100 h-[40px] rounded-br-[4px] rounded-tl-[1px] rounded-tr-[4px] w-[44.951px]" />
                <div className="flex flex-col font-normal h-[24px] justify-center ml-[22.82px] mt-[20.44px] relative text-[#131313] text-[14px] text-center translate-x-[-50%] translate-y-[-50%] w-[39.843px]">
                  <p className="leading-[normal]">{`% `}</p>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_4px_0px_inset_rgba(0,0,0,0.15)]" />
            </div>
            <button className="bg-neutral-100 border border-[#e1ebf9] border-solid box-border flex flex-col h-[44px] items-center justify-center max-h-[50px] min-h-[28px] px-[8px] py-0 relative rounded-[8px] shrink-0 w-[151px]">
              <div className="flex gap-[10px] items-center justify-center relative shrink-0">
                <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#28408f] text-[14px] text-center text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Aplicar descuento</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="bg-neutral-50 border-2 border-[#e9e9e9] border-solid box-border flex gap-[8px] h-[40px] items-center min-h-[40px] px-[16px] py-[14px] relative rounded-[4px] shrink-0 w-[328px]">
          <div className="flex gap-[8px] items-center relative shrink-0">
            <div className="h-[15.978px] relative shrink-0 w-[16px]">
              <img alt="" className="block max-w-none size-full" src="/43b717c802eff3bd97968791e8e0d7b39876994d.svg" />
            </div>
            <div className="flex flex-col font-normal justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#929292] text-[14px] text-nowrap">
              <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">Buscar</p>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_4px_0px_rgba(37,37,37,0.1)]" />
        </div>
      </div>

      {/* Media List and Detail View */}
      <div className="flex gap-[16px] items-start overflow-clip relative shrink-0 w-full z-[2]">
        <MediaList />
        <DetailView />
      </div>
    </div>
  )
}

export default MainContent

