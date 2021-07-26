import {useState} from 'react'
import { Tree,Input } from 'antd'

const { Search } = Input

const LeftTree = ({
    treeDatas,
    onSelect
}:{
    treeDatas:any;
    onSelect:(k:any,e:any)=>void;
}) => {

    // 左边树
    const [expandedKeys,setExpandedKeys]=useState<any[]>([])
    const [searchValue,setSearchValue]=useState('')
    const [autoExpandParent,setAutoExpandParent]=useState(true)
  
    //左边树操作
    const dataList:any[] = []
    const generateList = (data:any) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i]
            const { id,name } = node
            dataList.push({ id, name })
            if (node.children) {
                generateList(node.children)
            }
        }
    }

    generateList(treeDatas)

    const getParentKey:any = (key:any, tree:any) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
        if (node.children.some((item:any) => item.id === key)) {
            parentKey = node.id
        } else if (getParentKey(key, node.children)) {
            parentKey = getParentKey(key, node.children)
        }
        }
    }
    return parentKey
    }

    const onExpand = (expandedKeys:any) => {
        setExpandedKeys(expandedKeys)
        setAutoExpandParent(false)
    }

    const onChange = (e:any) => {
        const { value } = e.target
        const expandedKeys = dataList
            .map((item:any) => {
                if (item.name.indexOf(value) > -1) {
                    return getParentKey(item.id, treeDatas)
                }
                return null;
            })
            .filter((item:any, i:any, self:any) => item && self.indexOf(item) === i)
            setExpandedKeys(expandedKeys)
            setSearchValue(value)
            setAutoExpandParent(true)
    }

    const loop = (data:any) =>
    data?.map((item:any) => {
        const index = item.name.indexOf(searchValue);
        const beforeStr = item.name.substr(0, index);
        const afterStr = item.name.substr(index + searchValue.length);
        const title =
        index > -1 ? (
            <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
            </span>
        ) : (
            <span>{item.name}</span>
        );
        if (item.children) {
            return { title, id: item.id, key: item.id, children: loop(item.children) };
        }

        return {
            title,
            id: item.id,
            key: item.id
        };
    })

    return (
    <div>
      <Search style={{ marginBottom: 8 }} placeholder='搜索' onChange={onChange} />
      <Tree
        onSelect={onSelect}
        onExpand={onExpand}
        showLine={true}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(treeDatas)}
      />
    </div>
    )
  }

export default LeftTree