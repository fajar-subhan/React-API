
const List = (props) => {
    return (
        <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
                <div className="card">
                    <img src="https://placeimg.com/300/200/tech" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.data.title}</h5>
                        <p className="card-text">{props.data.body}</p>
                        <p className="card-text"><small className="text-muted">ID : {props.data.id}</small></p>
                        <button type="button" className="btn btn-danger" onClick={() => props.handleRemove(props.data.id)}>Hapus</button> &nbsp;
                        <button type="button" className="btn btn-success" onClick={() => props.getDataByID(props.data.id)}>Ubah</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;