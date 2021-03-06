import {
    INIT_RATE,
    SET_CURRENT_STEP,
    SET_REVIEWER_DETAILS,
    SET_REVIEWER_QUESTIONS,
    SET_REVIEWER_RATINGS
} from './rateMovieConstants';
const initialState = {
    currentStep: 1,
    ratings: {
        reviewerDetails: { age: 18, gender: 'FEMALE' },
        reviewerQuestions: {
            movieLong: 'allMovie',
            bechdelTest: 'false'
        },
        reviewerRating: {
            femaleLead: 0,
            LGBTQ: 0,
            minorityRepresentation: 0,
            sexualityRate: 0
        }
    }
};

function movieRateReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_RATE:
            return {
                ...initialState
            };
        case SET_REVIEWER_DETAILS:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    reviewerDetails: action.payload
                }
            };
        case SET_REVIEWER_RATINGS:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    reviewerRating: action.payload
                }
            };
        case SET_REVIEWER_QUESTIONS:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    reviewerQuestions: action.payload
                }
            };
        case SET_CURRENT_STEP:
            return { ...state, currentStep: action.payload };

        default:
            return state;
    }
}

export default movieRateReducer;
