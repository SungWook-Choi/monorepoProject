import {useState} from 'react';


const RightSidePanel = () => {
    const [isOnPanel, setIsOnPanel] = useState<boolean>(false);

    return (
        <aside className='right_sidebar'
            onMouseLeave={() => setIsOnPanel(false)}
            onMouseEnter={() => setIsOnPanel(true)}
        >
            {!isOnPanel && (
                <div>O</div>
            )}
            {isOnPanel && (
                <div>Test</div>
            )}
        </aside>
    )
}
export default RightSidePanel;
