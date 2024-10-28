import React, { useState } from 'react';
import { useGetTabsQuery } from '../redux/api/tabsAPI';
import Loading from './utils/Loading';
import Error from './utils/Error';

const Tabs = () => {
    const [current, setCurrent] = useState(1)
    const {isLoading, isSuccess, isError, error, data: content} = useGetTabsQuery()
    const tabs = [1, 2, 3, 4]

    if(isLoading)
        return <Loading />

    if(isError)
        return <Error message={error.message || error.status || "An error occurred."} />
    

    return (
        <div className='tabs'>
            <div className='header'>
                {
                tabs.map((index) => {
                    return (
                        <div key={index} className={`tab ${current === index ? 'active' : ''}`} onClick={() => setCurrent(index)}>
                            <p>Tab {index}   </p>
                        </div>)
                })
                }
            </div>
            <div className='body'>
                <h1>Title {current}</h1>
                <div>
                    {content}
                </div>
            </div>

        </div>
    );
}

export default Tabs;
