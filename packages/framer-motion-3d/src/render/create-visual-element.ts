import type {
    CreateVisualElement,
    TargetAndTransition,
    ResolvedValues,
} from "framer-motion"

import {
    createBox,
    checkTargetForNewValues,
    VisualElement,
} from "framer-motion"
import { Object3DNode } from "@react-three/fiber"

import { setThreeValue } from "./utils/set-value"
import { readThreeValue } from "./utils/read-value"
import { ThreeRenderState } from "../types"
import { scrapeMotionValuesFromProps } from "./utils/scrape-motion-value"

export const createRenderState = () => ({})

export class ThreeVisualElement extends VisualElement<
    Object3DNode<any, any>,
    ThreeRenderState,
    {}
> {
    type = "three"

    readValueFromInstance = readThreeValue

    getBaseTargetFromInstance() {
        return undefined
    }

    sortInstanceNodePosition(
        a: Object3DNode<any, any>,
        b: Object3DNode<any, any>
    ) {
        return a.id - b.id
    }

    makeTargetAnimatableFromInstance({
        transition,
        ...target
    }: TargetAndTransition) {
        checkTargetForNewValues(this, target, {})
        return target
    }

    removeValueFromRenderState() {}

    measureInstanceViewportBox = createBox

    scrapeMotionValuesFromProps = scrapeMotionValuesFromProps

    build(state: ThreeRenderState, latestValues: ResolvedValues) {
        for (const key in latestValues) {
            state[key] = latestValues[key]
        }
    }

    renderInstance(
        instance: Object3DNode<any, any>,
        renderState: ThreeRenderState
    ) {
        for (const key in renderState) {
            setThreeValue(instance, key, renderState)
        }
    }
}

export const createVisualElement: CreateVisualElement<any> = (_, options) =>
    new ThreeVisualElement(options, {})
