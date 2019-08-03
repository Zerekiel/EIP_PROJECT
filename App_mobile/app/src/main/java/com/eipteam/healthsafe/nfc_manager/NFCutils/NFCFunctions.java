package com.eipteam.healthsafe.nfc_manager.NFCutils;

import android.content.Intent;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.os.Parcelable;
import android.util.Log;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class NFCFunctions {
    public static NdefMessage[] getNdefMessages(Intent intent) {
        NdefMessage[] msgs = null;

        if (NfcAdapter.ACTION_TAG_DISCOVERED.equals(intent.getAction()) || NfcAdapter.ACTION_NDEF_DISCOVERED.equals(intent.getAction())) {
            Parcelable[] rawMsgs = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);

            if (rawMsgs != null) {
                msgs = new NdefMessage[rawMsgs.length];

                for (int i = 0; i < rawMsgs.length; i++) {
                    msgs[i] = (NdefMessage) rawMsgs[i];
                }
            } else {
                byte[] empty = new byte[] {};
                NdefRecord record = new NdefRecord(NdefRecord.TNF_UNKNOWN, empty, empty, empty);
                NdefMessage msg = new NdefMessage(new NdefRecord[] { record });

                msgs = new NdefMessage[] { msg };
            }
        } else {
            Log.d(intent.getAction(), "Unknown intent");
        }

        return msgs;
    }

    public static boolean checkData(String[] keys, String datas) {
        if (!datas.contains("\n"))
            return false;

        String[] records = datas.split("\n");

        ArrayList<String> tmp = new ArrayList<>();

        tmp.addAll(Arrays.asList(keys));

        for (String rec : records) {
            if (!rec.contains(":"))
                return false;
            if (!tmp.contains(rec.split(":")[0]))
                return false;
        }

        return true;
    }

    public static String mapToString(HashMap<String, String> map) {
        StringBuilder stringBuilder = new StringBuilder();

        for (String s : map.keySet()) {
            stringBuilder.append(s + ":" + map.get(s));
            stringBuilder.append("\n");
        }

        return stringBuilder.toString();
    }

    public static HashMap<String, String> stringToMap(String str) {
        String[] lines = str.split("\n");
        HashMap<String, String> map = new HashMap<>();

        for (String s : lines) {
            map.put(s.split(":")[0], s.split(":")[1]);
        }

        return map;
    }
}
