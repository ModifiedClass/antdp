//最高层级的对象的pId是给的空字符串，所以 let c = FlatToNested({}, arr, parent_id = ''); 就写了pid = ‘’,
//如果是null，或者甚至连个parent_id的字段都不给,那么你就改成 let c = FlatToNested({}, arr, parent_id = null);
//  或者 let c = FlatToNested({}, arr, parent_id = undefind);  

export const  FlatToNested = (data, arr, id) => {
    let filtersList = arr.filter(e => e.parent_id === id)
    data.children = filtersList
    data.children = data.children.map(e => {
        e = FlatToNested(e, arr, e.id)
        return e
    });
    return data
}

// let c = FlatToNested({}, arr, parent_id = '');

export const treeDataHelper = (treeData) => {
    const dataList = []
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i]
            const { id,name } = node
            dataList.push({ id, name })
            if (node.children) {
                generateList(node.children)
            }
        }
    }
    generateList(treeData)
    const loop = (data) =>
        data.map((item) => {
            const title = item.name
            if (item.children) {
                return { title, id: item.id, key: item.id, children: loop(item.children) }
            }
    
            return {
                title,
                id: item.id,
                key: item.id
            };
        })
    
    return loop(treeData)
}