export default function FirebaseVideo(userId, videoId){
    let path = "https://firebasestorage.googleapis.com/v0/b/acejobs-98b81.appspot.com/o/video-resume"
    path += encodeURIComponent("/" + userId + "/" + videoId + ".webm")
    path += "?alt=media"
    return path
}