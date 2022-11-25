import Button from "../Button"

const ModalAttention = () => {
  return (
    <div className="flex flex-col justify-between w-[550px] h-[190px] bg-section rounded-[15px] pt-[25px] px-[20px] pb-[25px]">
      <h2 className="text-[28px] font-bold text-titleText text-center">Attention! You will be redirected to homepage.</h2>
      <div className="flex justify-center">
        <Button className="w-[80px] h-[38px] font-bold" submit={true}>OK</Button>
      </div>
    </div>
  )
}

export default ModalAttention