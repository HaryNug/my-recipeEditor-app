const TopForm = (props) => {
    const {children} = props
    return (
        <div className="w-3/5 bg-white my-8 text-2xl border border-gray-300 ">
            {children}
        </div>
    )
}

const HeaderIngredient = (props) => {
    const {ingredient, value} = props
    return (
        <h5 className="pr-20">
            {ingredient}
        </h5>
    )
}

const HeaderMeasures = (props) => {
    const {measure} = props
    return (
        <h5 className="pl-20">
            {measure}
        </h5>
    )
} 

const Footer = () => {
    return (
        <h5 className="px-10">
            Total Ingredients
        </h5>
    )
}

const FooterTotal = (props) => {
    const {total} = props
    return (
        <p>
            {total}
        </p>
    )
}

TopForm.HeaderIngredient = HeaderIngredient;
TopForm.HeaderMeasures = HeaderMeasures;
TopForm.Footer = Footer;
TopForm.FooterTotal = FooterTotal

export default TopForm