import Sidebar from './Sidebar'
import Header from './Header'
import MainContent from './MainContent'

function Cotizador() {
  return (
    <div className="bg-white relative w-full h-screen">
      {/* Browser Bar */}
      <div className="absolute bg-white border-b border-[rgba(0,0,0,0.05)] left-0 top-0 w-full h-[76px]">
        <div className="flex flex-col items-start overflow-hidden relative rounded-inherit w-full">
          <div className="bg-[#dee1e6] flex items-end relative shrink-0 w-full h-[36px]">
            <div className="h-[36px] relative shrink-0 w-[92px]">
              <img alt="" className="block max-w-none size-full" src="/103c3db1d14ef2e8a9787d84ba6860aa08cfe75c.png" />
            </div>
            <div className="box-border flex items-center pl-0 pr-[16px] py-0 relative shrink-0">
              <div className="h-[32px] mr-[-16px] relative shrink-0 w-[256px]">
                <div className="absolute bg-white box-border flex gap-[4px] items-center left-[8px] pl-[12px] pr-[8px] py-[8px] rounded-tl-[8px] rounded-tr-[8px] top-0 w-[240px]">
                  <div className="basis-0 flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
                    <div className="relative shrink-0 size-[16px]">
                      <img alt="" className="block max-w-none size-full" src="/298cc63feb6590be6b8e8fabf54675a2830a307d.png" />
                    </div>
                    <div className="basis-0 flex flex-col font-normal grow h-[16px] justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#36373a] text-[12px]">
                      <p className="leading-[normal]">OBP- By IMJ Media for you...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white box-border flex gap-[16px] items-center px-[16px] py-[4px] relative shrink-0 w-full">
            <div className="flex gap-[12px] items-center justify-center relative shrink-0">
              <div className="overflow-clip relative shrink-0 size-[24px]">
                <img alt="" className="block max-w-none size-full" src="/009d5d624fbb6f6e3ccdf1fbea2ce1e7f12288b7.svg" />
              </div>
              <div className="overflow-clip relative shrink-0 size-[24px]">
                <img alt="" className="block max-w-none size-full" src="/017a547d0c049237b3a096e1021910c59a4a72e7.svg" />
              </div>
              <div className="overflow-clip relative shrink-0 size-[24px]">
                <img alt="" className="block max-w-none size-full" src="/072354cee0e8fcfe46744d6a858d58d263015f74.svg" />
              </div>
            </div>
            <div className="basis-0 bg-[#f1f3f4] box-border flex grow items-center min-h-px min-w-px px-[12px] py-[6px] relative rounded-[20px] shrink-0">
              <div className="basis-0 flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <img alt="" className="block max-w-none size-full" src="/0d04baa1d8f5aa5c258b4727b5292181a0f5f55f.svg" />
                </div>
                <div className="flex gap-[2px] items-center relative shrink-0">
                  <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#36373a] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">obp.imjmedia.com.mx</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="absolute bg-[#efefef] flex h-[calc(100vh-76px)] items-start left-0 top-[76px] w-full">
        <Sidebar />
        <div className="basis-0 box-border flex flex-col grow h-full items-start min-h-px min-w-px p-[16px] relative shrink-0">
          <Header />
          <MainContent />
        </div>
      </div>
    </div>
  )
}

export default Cotizador

