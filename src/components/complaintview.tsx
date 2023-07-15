import { ComplaintsInterface, CommentsInterface } from "../interfaces/complaintInterface"
import { Authentication, UserInterface } from "../interfaces/user"
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AllUsersContext } from "../context/allusers";


const CommentComponent = ({ comm }: { comm: CommentsInterface }) => {
    const allUserContext = useContext(AllUsersContext)
    const [commSender, setCommSender] = useState<UserInterface | null>(null)
    const [postTime, setPostTime] = useState('')

    function getPostTime() {
        const timestamp = comm?.created_at;
        const formattedDateTime = new Date(timestamp).toLocaleString();
        setPostTime(formattedDateTime)
    }

    useEffect(() => {
        console.log(comm, 'djhkllkhfgdfgjhklkjhg')
        let user = allUserContext.value.filter(e => comm.user == e.id)
        setCommSender(user[0])
        getPostTime()

    }, [])

    return <>
        <div style={{
            marginTop: '5px'
        }} className="col-lg-10 col-sm-12 d-flex align justify-content-between">
            <div style={{
                marginRight: "10px"
            }} className="text"><b>{commSender?.username} </b></div>
            <div className="text">{postTime}</div>
        </div>
        <div className=" d-flex col-lg-12 flex-wrap">
            <p className="text-post">{comm.comment}</p>
        </div>
        <hr />
    </>
}

const ComplaintView = ({ complaint, i, comments }: { complaint: ComplaintsInterface, i: number, comments: CommentsInterface[] }) => {
    const [postSender, setPostSender] = useState<UserInterface | null>(null);
    const [postTime, setPostTime] = useState('');
    useEffect(() => {
        getUsername();
        getPostTime();
    },)

    const handleComplaintComment = (_complaintId: string) => async (formSubmit: React.FormEvent<HTMLFormElement>) => {
        formSubmit.preventDefault();
        let fd = new FormData(formSubmit.currentTarget);
        const jsonComment = JSON.stringify(Object.fromEntries(fd));
        const userAuth = JSON.parse(localStorage.getItem('user')!) as Authentication;
        const encodedAuth = `${`${userAuth.auth.username}:${userAuth.auth.password}`}`
        console.log('====================================');
        console.log(jsonComment, "Newcomment");
        console.log('====================================');
        try {
            const response = await fetch(`api/createcomment/?auth=${encodedAuth}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jsonComment })
            });
            const data = await response.json();
            alert('comment created')
        } catch (error) {
            console.log(error, 'comment error');
            alert('failed to send comment');
        }
        // axios.post(`${baseUrl}comments/create`, jsonComment, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // auth: (JSON.parse(localStorage.getItem('user')!) as Authentication).auth,

        // }).then(res => {
        //     alert('comment created')
        // }).catch(error => {
        //     console.log('comment not created')

        // })
    }
    const allUserContext = useContext(AllUsersContext)
    function getUsername() {
        const userId = complaint.user;
        let user = allUserContext.value.filter(e => userId == e.id)
        setPostSender(user[0])
    }
    function getPostTime() {
        const timestamp = complaint?.created_at;
        const formattedDateTime = new Date(timestamp).toLocaleString();
        setPostTime(formattedDateTime)
    }

    return <> <div className="row d-flex align-items-center justify-content-center">
        <div className="col-lg-12" key={`complaint${i}`}>
            <div className="card" >
                <div className="d-flex flex-wrap p-2 px-3 justify-content-between">
                    <div className="col-lg-3 col-sm-12 d-flex align justify-content-between ">
                        <div className="text">{postSender?.username}</div>
                        <div className="text">{postTime}</div>
                    </div>
                    <div className="">
                        <button role="button" className="form-control btn btn-primary btn-teal rounded-pill submit px-3" data-bs-toggle="modal" data-bs-target={`#exampleModal${complaint.id}`}>Comment</button>
                    </div>
                </div>
                <div className="p-2 d-flex flex-wrap">
                    <p className="text-post ">{complaint.description}</p>
                    <hr />
                    <div className="imgSection col-lg-12 col-sm-12 d-flex flex-wrap">
                        <img src={complaint.image} className="col-lg-3 col-sm-12 img-fluid" />
                    </div>
                    <hr />
                    <div className="col-lg-10 ms-lg-auto d-flex align-items-start">
                        <div className="d-flex flex-column align-items-start">
                            {comments.map((comm, ii) =>
                                <React.Fragment key={`comment${ii}`}>
                                    <CommentComponent comm={comm} />
                                </React.Fragment>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div className="modal" id={`exampleModal${complaint.id}`} tabIndex={-1} role="dialog" aria-labelledby={`#exampleModal${complaint.id}`}>
            <form onSubmit={handleComplaintComment(complaint.id)}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Comment</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea className="modalTextArea" name="comment" />
                            <input value={complaint.id} name="complaint" hidden />
                            <input name="user" value={(JSON.parse(localStorage.getItem('user')!) as Authentication).id} hidden />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-teal btn-sm" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary btn-teal btn-sm">Post</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>

}

export default ComplaintView