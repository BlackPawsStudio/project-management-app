const ModalAttention = () => {
  return (
    <div className="flex flex-col justify-between w-[981px] h-[344px] bg-section rounded-[26px] pt-[43px] px-[44px]">
      <h2 className="text-[48px] leading-[58.09px] font-bold text-titleText">Are you sure you want to delete board</h2>
      <div>
        <button className="w-[214px] h-[88px] text">Yes</button>
        <button>No</button>
      </div>
    </div>
  )
}

export default ModalAttention