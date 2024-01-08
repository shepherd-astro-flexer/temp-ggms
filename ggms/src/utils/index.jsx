import axios from "axios";
import dayjs from "dayjs";

export const customFetch = axios.create({
    baseURL: "/api/v1"
})

export const formatPrice = (price) => {
    const dollarsAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format((price/100).toFixed(2));
    return dollarsAmount
}

export const optionsArray = (num) => {
    return Array.from({length: num}, (_, idx) => {
        const value = idx + 1;

        return <option key={value}>{value}</option>
    })
}

export const formatDate = (inputDate) => {
    const formattedDate = dayjs(inputDate).format('MMMM D');
    return formattedDate.replace(/\b(\d{1})\b/g, '0$1'); // Add leading zero to single-digit day
  };

export const currentDate = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    console.log(`${year}-${month < 10 ? `0${month}` : month }-${day < 10 ? `0${day}` : day}`)
    return `${year}-${month < 10 ? `0${month}` : month }-${day < 10 ? `0${day}` : day}`;
}

export const debounce = (func, timeout) => {
    let timeoutId;
    // ! this is the function that gets passed in on the event handler
    return (e) => {
        clearTimeout(timeoutId);
        const formData = e.currentTarget.form;
        
        // ? scope scope?
        timeoutId = setTimeout(() => {
            func(formData);
        }, timeout)
    }
}

export const paginationTest = (length, currentPage) => {
    const testArray = [];

    const pagesArray = Array.from({length}, (_, idx) => idx + 1)
    
    pagesArray.forEach((page) => {
      if (page === 1) {
        testArray.push(page);
        if (currentPage > 3) {
          testArray.push("...")
        }
      } else if (currentPage === page) {
        testArray.push(page)
      } else if (currentPage + 1 === page || currentPage - 1 === page) {
        testArray.push(page)
      } else if (page === length) {
        if (currentPage < length - 2) {
          testArray.push("...")
        }
        testArray.push(page)
      }
    })
  
    return testArray
}


   