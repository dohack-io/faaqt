import { Object3D, Mesh } from "three";

const getBoundingBoxFromGroup = (group: Object3D) => {
    const meshes = group.children.filter(v => v instanceof Mesh) as Mesh[];
    if (meshes.length == 0)
        return null;

    // TODO handle multiple meshes

    const geometry = meshes[0].geometry;
    geometry.computeBoundingBox();
    return geometry.boundingBox.translate(group.position);
}

function checkHitStatus(player: Object3D, spikes: Object3D[]) {
    const bb = getBoundingBoxFromGroup(player);

    for (const spike of spikes) {
        const bbOfSpike = getBoundingBoxFromGroup(spike);
        if (bbOfSpike.intersectsBox(bb))
            return true;

    }

    return false;
}

export { checkHitStatus };