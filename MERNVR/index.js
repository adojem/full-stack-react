import React from 'react';
import {
   asset,
   AppRegistry,
   Environment,
   NativeModules,
   StyleSheet,
   Text,
   View,
   VrButton,
   VrHeadModel,
} from 'react-360';
import Entity from 'Entity';

const { AudioModule } = NativeModules;

const styles = StyleSheet.create({
   completeMessage: {
      margin: 0.1,
      height: 1.5,
      backgroundColor: 'green',
      transform: [{ translate: [0, 0, -5] }],
   },
   congratsText: {
      fontSize: 0.5,
      textAlign: 'center',
      marginTop: 0.2,
   },
   collectedText: {
      fontSize: 0.2,
      textAlign: 'center',
   },
   button: {
      margin: 0.1,
      height: 0.5,
      backgroundColor: 'blue',
      transform: [{ translate: [0, 0, -5] }],
   },
   buttonText: {
     fontSize: 0.3,
     textAlign: 'center',
   },
});

export default class MERNVR extends React.Component {
   constructor() {
      super();
      this.state = {
         game: {
            name: 'Space Exploration',
            world:
               'https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/mernbook/vrGame/milkyway.jpg',
            answerObjects: [
               {
                  objUrl: 'https://s3.amazonaws.com/mernbook/vrGame/planet.obj',
                  mtlUrl: 'https://s3.amazonaws.com/mernbook/vrGame/planet.mtl',
                  translateX: -50,
                  translateY: 0,
                  translateZ: 30,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  scale: 7,
                  color: 'white',
               },
            ],
            wrongObjects: [
               {
                  objUrl: 'https://s3.amazonaws.com/mernbook/vrGame/tardis.obj',
                  mtlUrl: 'https://s3.amazonaws.com/mernbook/vrGame/tardis.mtl',
                  translateX: 0,
                  translateY: 0,
                  translateZ: 90,
                  rotateX: 0,
                  rotateY: 20,
                  rotateZ: 0,
                  scale: 1,
                  color: 'white',
               },
            ],
         },
         vrObjects: [],
         collectedList: [],
         collectedNum: 0,
         hide: 'none',
         hmMatrix: VrHeadModel.getHeadMatrix(),
      };
      this.lastUpdate = Date.now();
   }

   componentDidMount = () => {
      const { game } = this.state;
      const vrObjects = game.answerObjects.concat(game.wrongObjects);
      this.setState({ vrObjects });
      Environment.setBackgroundImage({ uri: game.world });
   };

   setModelStyles = (vrObject, index) => ({
      display: this.state.collectedList[index] ? 'none' : 'flex',
      color: vrObject.color,
      transform: [
         { translateX: vrObject.translateX },
         { translateY: vrObject.translateY },
         { translateZ: vrObject.translateZ },
         { scale: vrObject.scale },
         { rotateX: vrObject.rotateX },
         { rotateY: vrObject.rotateY },
         { rotateZ: vrObject.rotateZ },
      ],
   });

   rotate = index => () => {
      const now = Date.now();
      const diff = now - this.lastUpdate;
      const { vrObjects } = this.state;
      vrObjects[index].rotateY = vrObjects[index].rotateY + diff / 200;
      this.lastUpdate = now;
      this.setState({ vrObjects });
      this.requestId = requestAnimationFrame(this.rotate(index));
   };

   stopRotate = () => {
      if (this.requestId) {
         cancelAnimationFrame(this.requestId);
         this.requestId = null;
      }
   };

   collectItem = vrObject => () => {
      const { collectedList, collectedNum, game } = this.state;
      const match = game.answerObjects.indexOf(vrObject);
      if (match !== -1) {
         const updateCollectedList = collectedList;
         const updateCollectedNum = collectedNum + 1;
         updateCollectedList[match] = true;
         this.checkGameCompleteStatus(updateCollectedNum);
         AudioModule.playOneShot({
            source: asset('collect.mp3'),
         });
         this.setState({
            collectedList: updateCollectedList,
            collectedNum: updateCollectedNum,
         });
      }
      else {
         AudioModule.playOneShot({
            source: asset('clog-up.mp3'),
         });
      }
   };

   checkGameCompleteStatus = (collectedTotal) => {
      const { game } = this.state;
      if (collectedTotal === game.answerObjects.length) {
         AudioModule.playEnvironmental({
            source: asset('happy-bot.mp3'),
            loop: true,
         });
         this.setState({
            hide: 'flex',
            hmMatrix: VrHeadModel.getHeadMatrix(),
         });
      }
   };

   setGameCompletedStyle = () => ({
      position: 'absolute',
      display: this.state.hide,
      layoutOrigin: [0.5, 0.5],
      width: 6,
      transform: [{ translate: [0, 0, 0] }, { matrix: this.state.hmMatrix }],
   });

   exitGame = () => Location.replace('/');

   render() {
      const { game, vrObjects } = this.state;

      return (
         <View>
            {vrObjects.map((vrObject, i) => (
               <VrButton onClick={this.collectItem(vrObject)} key={vrObject.objUrl}>
                  <Entity
                     style={this.setModelStyles(vrObject, i)}
                     source={{
                        obj: { uri: vrObject.objUrl },
                        mtl: { uri: vrObject.mtlUrl },
                     }}
                     onEnter={this.rotate(i)}
                     onExit={this.stopRotate}
                  />
               </VrButton>
            ))}
            <View style={this.setGameCompletedStyle()}>
               <View style={styles.completeMessage}>
                  <Text style={styles.congratsText}>Congratulations!</Text>
                  <Text style={styles.collectedText}>
                     {`You have collected all items in ${game.name}`}
                  </Text>
               </View>
               <VrButton>
                  <View style={styles.button}>
                     <Text style={styles.buttonText}>Play another game</Text>
                  </View>
               </VrButton>
            </View>
         </View>
      );
   }
}

AppRegistry.registerComponent('MERNVR', () => MERNVR);
