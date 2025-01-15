const Loader = (props) => {
    return <>
        <div className="loader_comp">
            <p className="loaderContainer">{props.loaderMsg}<span className="loaderDots"></span></p>
        </div>
    </>
}
export default Loader
