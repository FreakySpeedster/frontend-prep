import {useState} from 'react';


const jsonData = [
    {
      "id": 1,
      "name": "Documents",
      "type": "folder",
      "children": [
        {
          "id": 2,
          "name": "Resume.pdf",
          "type": "file",
          "size": "150KB"
        },
        {
          "id": 3,
          "name": "Project Reports",
          "type": "folder",
          "children": [
            {
              "id": 4,
              "name": "Q1_Report.docx",
              "type": "file",
              "size": "300KB"
            },
            {
              "id": 5,
              "name": "Q2_Report.docx",
              "type": "file",
              "size": "320KB"
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "name": "Photos",
      "type": "folder",
      "children": [
        {
          "id": 7,
          "name": "Vacation",
          "type": "folder",
          "children": [
            {
              "id": 8,
              "name": "Beach.png",
              "type": "file",
              "size": "2MB"
            },
            {
              "id": 9,
              "name": "Mountains.jpg",
              "type": "file",
              "size": "2.5MB"
            }
          ]
        },
        {
          "id": 10,
          "name": "Family.jpg",
          "type": "file",
          "size": "1.2MB"
        }
      ]
    },
    {
      "id": 11,
      "name": "Music",
      "type": "folder",
      "children": [
        {
          "id": 12,
          "name": "Song1.mp3",
          "type": "file",
          "size": "4MB"
        },
        {
          "id": 13,
          "name": "Song2.mp3",
          "type": "file",
          "size": "5MB"
        }
      ]
    }
  ];
  
export default function FileExplorer() {
  const FolderNode = ({data}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleIsExpanded = () => {
      setIsExpanded((prev) => !prev);
    }
    return (
      <div>
        {data.type === 'folder' ? (
          <div onClick={toggleIsExpanded}>
            <span>📂</span>
            <span>{data.name}</span>
          </div>
        ) : (
          <div>
            <span>📄</span>
            <span>{data.name}</span>
          </div>
        )}
        
        {isExpanded && data.children && 
          data.children.map((child) => (
            <div style={{paddingLeft: '10px'}}>
              <FolderNode key={child.id} data={child} />
            </div>
          ))
        }
      </div>
    );
  }
  return (
    <>
      {jsonData.map((item) => (
        <FolderNode key={item.id} data={item} />
      ))}
    </>
  );


}