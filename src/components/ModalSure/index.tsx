import Button from "../Button"

const ModalSure = () => {
  return (
    <div className="flex flex-col justify-between w-[550px] h-[190px] bg-section rounded-[15px] pt-[25px] px-[20px] pb-[40px]">
      <h2 className="text-[28px] font-bold text-titleText">Are you sure you want to delete board</h2>
      <div className="flex justify-between px-[90px]">
        <Button className="w-[107px] h-[44px] font-bold" submit={true}>Yes</Button>
        <Button className="w-[107px] h-[44px] font-bold" cancel={true}>No</Button>
      </div>
    </div>
  )
}

export default ModalSure