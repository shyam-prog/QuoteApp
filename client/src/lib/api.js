// https://quote-app-shy.herokuapp.com/

export async function getAllQuotes() {
  // const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  // const data = await response.json();

  const res = await fetch('https://quote-app-shy.herokuapp.com/getQuotes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res_data = await res.json();
  const tempQuotes = [];
  // console.log(res_data.quotes);

  if (res_data.status === 'ok') {

    for (const key in res_data.quotes) {
      const quoteObj = {
        id: res_data.quotes[key]._id,
        author: res_data.quotes[key].creatorName,
        text: res_data.quotes[key].quote,
        creatorId: res_data.quotes[key].creatorId,
      };

      tempQuotes.push(quoteObj);
    }
    // console.log(tempQuotes);
  } else {
    alert(res_data.error);
  }

  // if (!response.ok) {
  //   throw new Error(data.message || 'Could not fetch quotes.');
  // }
  // // console.log(data);
  // const transformedQuotes = [];

  // for (const key in data) {
  //   const quoteObj = {
  //     id: key,
  //     ...data[key],
  //   };

  //   transformedQuotes.push(quoteObj);
  // }
  // console.log(transformedQuotes);

  return tempQuotes;
}

export async function getSingleQuote(quoteId) {
  // const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  // const data = await response.json();

  // if (!response.ok) {
  //   throw new Error(data.message || 'Could not fetch quote.');
  // }

  // const loadedQuote = {
  //   id: quoteId,
  //   ...data,
  // };

  //--------

  const res = await fetch(`https://quote-app-shy.herokuapp.com/getQuote?quoteId=${quoteId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res_data = await res.json();

  let quoteObj = {};

  if (res_data.status === 'ok') {
    quoteObj = {
      id: res_data.quotes._id,
      author: res_data.quotes.creatorName,
      text: res_data.quotes.quote,
      creatorId: res_data.quotes.creatorId,
      createdAt: res_data.quotes.createdAt,
    };
    console.log(res_data.quotes);
  } else {
    alert(res_data.error);
    throw new Error(res_data.error || "Couldnot able to fetch..")
  }

  return quoteObj;

}

export async function addQuote(quoteData) {
  
  const res = await fetch('https://quote-app-shy.herokuapp.com/createPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify({
      quoteText: quoteData.text,
      creatorName: quoteData.author,
      createdAt: new Date().getTime(),
    })
  })

  const res_data = await res.json();

  if (res_data.status === 'ok') {
    alert(res_data.msg);
  } else {
    alert(res_data.error);
  }

  return null;
}

export async function addComment(requestData) {
  // const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
  //   method: 'POST',
  //   body: JSON.stringify(requestData.commentData),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const data = await response.json();

  // if (!response.ok) {
  //   throw new Error(data.message || 'Could not add comment.');
  // }

  // console.log(data);

  //--------

  const res_data = await fetch('https://quote-app-shy.herokuapp.com/comments/addComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify({
      quoteId: requestData.quoteId,
      commentText: requestData.commentData.text,
    })
  })

  const res = await res_data.json();

  if (res.status != 'ok') {
    alert(res.data);
  }
  return { commentId: res.commentId };
}

export async function getAllComments(quoteId) {
  // const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  // const data = await response.json();

  // if (!response.ok) {
  //   throw new Error(data.message || 'Could not get comments.');
  // }

  // const transformedComments = [];

  // for (const key in data) {
  //   const commentObj = {
  //     id: key,
  //     ...data[key],
  //   };

  //   transformedComments.push(commentObj);
  // }

  //---


  const res_data = await fetch(`https://quote-app-shy.herokuapp.com/allComments?quoteId=${quoteId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await res_data.json();

  console.log("Line 208");

  console.log(res.comments.commentData);

  let tempComments = [];

  const tempRes = res.comments.commentData;

  for (const key in tempRes) {
    const commentObj = {
      quoteId: res.comments.quoteId,
      id: tempRes[key]._id,
      text: tempRes[key].commentText,
      creatorName: tempRes[key].creatorName,
    };

    tempComments.push(commentObj);
  }
  console.log("line 214");
  console.log(tempComments);

  return tempComments;
}

export async function deleteQuote(quoteId){
  const res_data = await fetch('https://quote-app-shy.herokuapp.com/deleteQuote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify({
      quoteId: quoteId,
    })
  })
  const res = await res_data.json();
  if(res.status == 'ok'){
    alert(res.data);
    window.location.href = '/quotes?yourQuote=yes';
  }else{
    alert(res.data);
  }
}


export async function deleteComment(quoteId){
  const res_data = await fetch('https://quote-app-shy.herokuapp.com/deleteComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify({
      quoteId: quoteId,
    })
  })
  const res = await res_data.json();
  if(res.status == 'ok'){
    alert(res.data);
    window.location.href = `/quotes/${quoteId}/comments`;
  }else{
    alert(res.data);
  }
}


