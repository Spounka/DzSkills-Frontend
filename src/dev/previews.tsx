import React from "react";
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import {PaletteTree} from "./palette";
import FullScreenLoadingFallback from '../components/full-screen-loading-fallback';
import CoursesPage from '../pages/courses-page';

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path='/FullPageLoading'>
                <FullScreenLoadingFallback />
            </ComponentPreview>
            <ComponentPreview path='/CoursesPage'>
                <CoursesPage />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;