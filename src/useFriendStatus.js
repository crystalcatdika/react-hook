import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        // function handleStatusChange(status) {
            if(friendID > 2) {
              setIsOnline('在线');
            } else {
              setIsOnline('下线');
            }

        // }

        // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
            // ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
    }, [friendID]);

    return isOnline;
}

export default useFriendStatus;
