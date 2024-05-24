export async function requestOtp(credentials,url) {
    console.log('credentials', credentials, url);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      // Handle the fact that res.json() won't work
      const data = await res.json(); // Assume success based on no error
      return {data, status: res.status};
    } catch (error) {
      console.error('Error:', error);
    }
  }