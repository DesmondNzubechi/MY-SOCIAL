
// export const postCard = () => {
//     return <div key={post.postId} className="shadow-xl border bg-white relative  p-2 gap-[20px] rounded-[10px] flex-col flex">
   
//    <div className="flex gap-1 flex-row items-center">
//        <h1 className="font-bold flex  capitalize items-center ">  {post.authorPics !== '' ? <Image src={post.authorPics} height={50} width={50} className="rounded-full " alt="post pic" /> :  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />}@{post.authorName}</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">{post.postsDate}</p>
//    </div>
//    <div className="">
//        <p>{ tobeDisplayed }</p>
//      {postContents.length > 20 && <button
//        onClick={() => {
//          showFullPostFn();
//          setFullPostData({
//            postImg: post.postImg,
//            postsContent: post.postsContent,
//            postId:post.postId,
//            postsDate: post.postsDate,
//            authorId: post.authorId,
//            authorName: post.authorName,
//            authorPics: post.authorPics,
//            postComment: [...post.postComment],
//            postLike: post.postLike,
//            postRepost:post.postRepost,
//            id:post.id,
//          })
//        }}
//        type="button"
//        className="font-bold">See More...
//      </button>}
//    </div>
//    <Image src={post.postImg} width={500} height={300} className="rounded-[10px] " alt="post pic" />
//    <div className="flex items-center border-t border-b py-[5px] justify-around">
//      <div onClick={showFullPostFn} className=" border-r flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">{post.postComment.length} Comments</p></div>
//        <div onClick={() => likePost(post)} className={` flex items-center p-[5px] cursor-pointer gap-x-[5px] ${post.postLike.find(like => like.likeId === loggedInUser?.uid) ? 'text-sky-700 ' : 'text-slate-500'}  `}><SlLike className="text-[20px] " /> <p
//          className={post.postLike.find(like => like.likeId === loggedInUser?.uid) ? 'text-sky-700 ' : 'text-slate-500' }>{post.postLike.length} Likes</p></div>
//        <div onClick={() => showRepost? setShowRepost(false) : setShowRepost(true)} className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] border-l "><BiRepost className="text-[20px] " /><p className="text-slate-500">{post.postRepost.length} Repost</p></div>
//        {showRepost && <div className="absolute flex flex-col bg-slate-50 gap-2 p-2 items-start rounded border  bottom-[135px]  right-0 ">
//          <button
//            onClick={() => {
//             Repost(post)
//            }}
//            className=" text-slate-700 text-[15px] flex flex-row items-center gap-x-1"><BiRepost className="text-[20px] "/> Instant Repost
//          </button>
//          <button  onClick={() => {
//              setShowQuoteRepost(true);
//              setFullPostData({
//                postImg: post.postImg,
//                postsContent: post.postsContent,
//                postId:post.postId,
//                postsDate: post.postsDate,
//                authorId: post.authorId,
//                authorName: post.authorName,
//                authorPics: post.authorPics,
//                postComment: [...post.postComment],
//                postLike: post.postLike,
//                postRepost:post.postRepost,
//                id:post.id,
//              })
//            }} className="text-slate-700 text-[15px]  flex flex-row items-center gap-x-1"><FaEdit className="text-[20px] "/> Repost with you thought</button>
//        </div>}
//    </div>
 
//      <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
//        <input onChange={(e) => setCommentInput(e.target.value)} type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
//        <button onClick={() => addCommentfn(post)} type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
//      </div>
  
//  </div>
// }