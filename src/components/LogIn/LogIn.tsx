


const LogIn = () => {
  return (
    <form className="relative px-[39px] pt-[92px] w-[500px] h-[700px] bg-section rounded-[26px]">
      <div className="absolute w-[348.21px] h-[480.3px] left-[151.79px] top-[9.91px] rounded-full bg-circle"></div>
      <h2 className="text-4xl font-bold text-titleText h-[75px] m-auto leading-[44px]"  >Log In</h2>
      <div className="flex flex-col justify-between px-[63px] pt-[92px] pb-[46px] w-[422px] h-[422px] bg-white rounded-[26px]">
        <div>
          <h4 className="text-[24px] text-titleText leading-[29px] font-bold text-left">Username</h4>
          <input className="w-[296px] h-[47px] rounded-[11px] bg-inputBackground" type="text" />
        </div>
        <div>
          <h4 className="text-[24px] text-titleText leading-[29px] font-bold text-left">Password</h4>
          <input className="w-[296px] h-[47px] rounded-[11px] bg-inputBackground" type="password" />
        </div>
        <div className="flex justify-between">
          <button className="w-[130px] h-[47px] text-[28px] font-normal text-background bg-headerText rounded-[11px] leading-[26px]">Confirm</button>
          <button className="w-[130px] h-[47px] text-[28px] font-normal text-background bg-headerText rounded-[11px] leading-[26px]">Cancel</button>
        </div>
      </div>
    </form>
  )
}

export default LogIn