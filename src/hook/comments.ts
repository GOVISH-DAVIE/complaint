import { useEffect, useState } from "react";
import { CommentsInterface } from "../interfaces/complaintInterface";
import { baseUrl } from "../components/home";
import axios from "axios";
import { Authentication } from "../interfaces/user";

export const useGetComments = (): CommentsInterface[] => {
    const [comments, setComments] = useState<CommentsInterface[]>([]);  
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const user = JSON.parse(localStorage.getItem("user")!) as Authentication;
          const response = await fetch("/api/allcomments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user.auth),
          });
          if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
          }
          const data = await response.json();
          setComments(data as CommentsInterface[]);
        } catch (error) {
          console.log(error, "allCommentshome error");
        }
      };
  
      fetchComments();
    }, []);
  
    return comments;
  };
// axios.get(`${baseUrl}comments`, {
//     auth: (JSON.parse(localStorage.getItem('user')!) as Authentication).auth
// }).then(
//     res => {
//         console.log(res.data);
//         setComments(res.data as CommentsInterface[])
//         // console.log(allComplaints, "allComplaints");
//     }
// ).catch(
//     error => {
//         console.log(error, "allcomplaints error");
//     })