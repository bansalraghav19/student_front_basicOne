import React,{Component} from 'react';
import Vimeo from '@u-wave/react-vimeo';

import './CSS/Videoplayer.css';
import {updateVideoTime,getVideoTime} from '../shared/http'

const videos = 
[
      { 
            id: 115783408, name: 'Jambinai - Connection',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      {     id: 438166716, name: 'Jambinai - They Keep Silence',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 169408731, name: 'Hoody - Like You',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 438166716, name: 'Jambinai - They Keep Silence ',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 115783408, name: 'Jambinai - Connection',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 438166716, name: 'Jambinai - They Keep Silence',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 169408731, name: 'Hoody - Like You',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 438166716, name: 'Jambinai - They Keep Silence',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      }    
];
    

class Videoplayer extends Component{

      constructor(props){
            super(props);
            this.state = {
                  videoIndex: 0,
                  videoList:[],
                  progress:{},
                  startTime:0,
                  timeFetched:0
            };
            this.selectVideo=this.selectVideo.bind(this);
            this.handlePlayerPause=this.handlePlayerPause.bind(this);
            this.onProgressHandler=this.onProgressHandler.bind(this);
            this.onEnd=this.onEnd.bind(this);
      }

      async selectVideo(index) {
            await this.setState({ videoIndex: index });
            await this.setState({ timeFetched: 0 });
            var res= await getVideoTime(videos[this.state.videoIndex].id)
            
            if( res.message=='Success !' ) {
                  console.log(res,parseInt(res.data.time),"time!!")
                  await this.setState({startTime:parseInt(res.data.time)})
            }

            else await this.setState({startTime:0})
            await this.setState({timeFetched:1})

      }

      async handlePlayerPause() {
            var res= await updateVideoTime(videos[this.state.videoIndex].id,this.state.progress.seconds)
            console.log("Paused",res)
      }


      async componentDidMount(){
            var res= await getVideoTime(videos[this.state.videoIndex].id)
            
            if( res.data ) {
                  console.log(res,parseInt(res.data.time),"time!!")
                  await this.setState({startTime:parseInt(res.data.time)})
            }
            else await this.setState({startTime:0})
            await this.setState({timeFetched:1})
      }


      async onEnd() {
            var res= await updateVideoTime(videos[this.state.videoIndex].id,this.state.progress.duration-1)

            console.log("Ended!!!!")
      }

      onProgressHandler(e) {
            this.setState({progress:e})
            console.log(e)
      }

      render() {
            const { videoIndex } = this.state;
        
            const video = videos[videoIndex];
            if(this.state.timeFetched!==0){
            return (
              <div className="container-video">
        
              <div className="video">
                <div className="main-video ">
                <div class="vimeo">
                  <Vimeo
                    video={video.id}
                    width={1000}
                    height={570}
                    autoplay
                    speed={true}
                    start={Math.max(0,this.state.startTime-15)}
                    // volume={volume}
                    // paused={paused}
                    onEnd={this.onEnd}
                    onPause={this.handlePlayerPause}
                    // onPlay={this.handlePlayerPlay}
                    onProgress={this.onProgressHandler}
                  />
                  </div>
                </div>
                <p className="main-text"> 
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                but also the leap into electronic typesetting, remaining essentially unchanged 
                </p>
                </div>
        
                <div className="other-videos">
                  <div className="collection">
                    {videos.map((choice, index) => (
        
                      <a
                        href={`#!/video/${index}`}
                        className={`other clearfix collection-item ${video === choice ? 'active' : ''}`}
                        onClick={() => this.selectVideo(index)}
                      >
                        <img src={choice.image} />
                        <div class="other-text">{choice.name}</div>
                      </a>
                    ))}
                  </div>
        
                </div>
        
              </div>
            );
                    }
                    else return <div>nk</div>
          }
}

export default Videoplayer;