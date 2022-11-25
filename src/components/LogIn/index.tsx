import Button from "../Button"
import Input from "../Input"

const LogIn = () => {
  return (
    <div className="relative  w-[500px] h-[700px] bg-section rounded-[26px] z-10 overflow-hidden">
      <div className="w-[500px] h-[500px] right-[-40%] top-[9.91px] bg-circle z-10 "/>
      <div className="absolute top-0 left-0 w-full h-full z-[11] px-[39px] pt-[92px]">
        <h2 className="text-4xl font-bold text-titleText h-[75px] m-auto leading-[44px]"  >Log In</h2>
        <div className="flex flex-col justify-between px-[63px] pt-[92px] pb-[46px] w-[422px] h-[422px] bg-white rounded-[26px] shadow-xxlInner">
          <div>
            <h4 className="text-[24px] text-titleText leading-[29px] font-bold text-left">Username</h4>
            <Input size="w-[296px] h-[47px]"/>
          </div>
          <div>
            <h4 className="text-[24px] text-titleText leading-[29px] font-bold text-left">Password</h4>
            <Input size="w-[296px] h-[47px]" type='password'/>
          </div>
          <div className="flex justify-between">
            <Button className="w-[130px] h-[47px]" submit={true} type="submit">Confirm</Button>
            <Button className="w-[130px] h-[47px]" cancel={true}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn