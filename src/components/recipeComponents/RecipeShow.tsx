import React from 'react';

import { RecipeLong } from '../../models/Recipe.interface';
import RecipeModel from '../../models/RecipeModel';

interface State {
    recipe: RecipeLong | null;
}

class RecipeShow extends React.Component<{}, State> {
    state = {
        recipe: null,
    }

    render() {
        return (
            <div>
                Recipe show page
            </div>
        );
    }
}

export default RecipeShow;