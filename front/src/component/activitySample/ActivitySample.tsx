import { Activity } from 'react';

const ActivitySample = (props: { type: string }) => {
    return (
        <div>
            <Activity mode={props.type === 'Show' ? 'visible' : 'hidden'}>
                <div>Show Activity</div>
            </Activity>
        </div>
    );
};
export default ActivitySample;
