const BottomForm = (props) => {
    const { children } = props
    return (
        <div className="w-4/5 px-10 py-5 bg-white my-10 text-2xl rounded-lg border border-green-400 ">
            {children}
        </div>
    )
}

const InputForm = (props) => {
    const {value, onChange=()=>{}, onClick=()=>{}} = props
    return (
        <div className="flex flex-row">
            <input 
                value={value} 
                onChange={onChange} 
                type="text" 
                placeholder="Search..." 
                className="w-2/4 px-2 py-3 border border-gray-300" />
            <button onClick={onClick} className="w-1/4 mx-20 rounded-lg border border-blue-700 bg-white text-blue-700 font-bold">
                Cari
            </button>
        </div>
    )
}

const IngredientData = (props) => {
    const {placeholder, onChange=()=>{}} = props
    return (
        <div style={{ width: '100%' }}>
            <input
                type="text"
                placeholder={placeholder} 
                onChange={onChange}
                className="w-full px-2 py-2 mb-2 border border-gray-300"
            >
                    
            </input>
        </div>
    )
}

const MeasureData = (props) => {
    const {placeholder, onChange=()=>{}} = props
    return (
        <div style={{ width: '25%' }}>
            <input 
                onChange={onChange}
                type="number"
                placeholder={placeholder} 
                className="w-full px-2 py-2 mb-2 ml-20 border border-gray-300"
            >
                
            </input>
        </div>
    )
}

BottomForm.InputForm = InputForm
BottomForm.IngredientData = IngredientData
BottomForm.MeasureData = MeasureData

export default BottomForm