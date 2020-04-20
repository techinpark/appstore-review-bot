import * as review from './reviews';

const parser = async() => {
    const content = await review.parse();  
    return {
        reviews: content
    };
};

export default parser; 