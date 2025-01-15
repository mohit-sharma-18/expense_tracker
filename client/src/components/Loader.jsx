const Loader = (props) => {
    return <>
        <div className="loader_comp">
            <p className="loaderContainer">{props.loadingMsg}<span className="loaderDots"></span></p>
        </div>
    </>
}
export default Loader
