
const Button = ({ product }) => {

  
  const handleClick = async (product) => {
    try{
      console.log('hi');
    }catch (error) {
      console.error('Invalid data format received:', error);
      throw new Error('Invalid data format received');
    }
  };
  return (
    <button  
    type='submit'
    onClick={() => handleClick(product)}
    className='w-fit px-4 py-2 text-xl bg-primary-orange hover:bg-white hover:text-gray-700 border border-primary-orange rounded-md font-satoshi text-white'
    >
      {action}
    </button>
  )
}

export default Button