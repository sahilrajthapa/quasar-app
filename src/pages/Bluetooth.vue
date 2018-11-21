<!-- testing page not required -->
<template>
    <q-page>
        <q-btn @click="initialize">initialize BLE</q-btn>
        <q-btn @click="enable">Enable Ble</q-btn>
        <q-btn @click="disable">Disable Ble</q-btn>
        <q-btn @click="startScan">startScan Ble</q-btn>
        <q-btn @click="stopScan">stopScan Ble</q-btn>
    </q-page>
</template>

<script>
export default {
  initialize() {
    var params = {
      request: true
      //restoreKey: "bluetooth-test-app"
    };

    console.log("Initialize : " + JSON.stringify(params));

    bluetoothle.initialize(
      null,
      function(obj) {
        console.log("Initialize Error : " + JSON.stringify(obj)); //Should only happen when testing in browser
      },
      function(obj) {
        console.log("Initialize Success : " + JSON.stringify(obj));
      },
      params
    );
  },

  enable() {
    console.log("Enable");

    bluetoothle.enable(null, function(obj) {
      console.log("Enable Error : " + JSON.stringify(obj));
    });
  },

  disable() {
    console.log("Disable");

    bluetoothle.disable(null, function(obj) {
      console.log("Disable Error : " + JSON.stringify(obj));
    });
  },

  startScan() {
    var params = {
      services: [],
      allowDuplicates: false
      //scanTimeout: 15000,
    };

    if (window.cordova) {
      params.scanMode = bluetoothle.SCAN_MODE_LOW_POWER;
      params.matchMode = bluetoothle.MATCH_MODE_STICKY;
      params.matchNum = bluetoothle.MATCH_NUM_ONE_ADVERTISEMENT;
      //params.callbackType = bluetoothle.CALLBACK_TYPE_FIRST_MATCH;
    }

    console.log("Start Scan : " + JSON.stringify(params));

    bluetoothle.startScan(
      function(obj) {
        console.log("Start Scan Auto Stop : " + JSON.stringify(obj));
      },
      function(obj) {
        console.log("Start Scan Error : " + JSON.stringify(obj));
      },
      function(obj) {
        console.log("Start Scan Success : " + JSON.stringify(obj));
      },
      params
    );
  },

  stopScan() {
    console.log("Stop Scan");
    bluetoothle.stopScan(
      function(obj) {
        console.log("Stop Scan Success : " + JSON.stringify(obj));
      },
      function(obj) {
        console.log("Stop Scan Error : " + JSON.stringify(obj));
      }
    );
  }
};
</script>

<style>
</style>
