package com.eipteam.healthsafe;

import android.app.AlertDialog;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.Ndef;
import android.nfc.tech.NdefFormatable;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import java.io.IOException;
import java.util.HashMap;

public class TransferData extends AppCompatActivity {

    private NfcAdapter nfcAdapter;
    private PendingIntent pendingIntent;
    private IntentFilter[] exchangeFilters;
    private Tag detectedTag;
    private HashMap<String, String> medicalInfos;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_transferdata);

        medicalInfos = new HashMap<>();

        String rawMap = getIntent().getStringExtra("Infos");

        if (rawMap.equals("NULL")) {
            for (String s : getResources().getStringArray(R.array.medical_informations)) {
                medicalInfos.put(s, "N/A");
            }
        } else {
            medicalInfos = stringToMap(rawMap);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        pendingIntent = PendingIntent.getActivity(this, 0, new Intent(this, getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0);

        IntentFilter ndefDetected = new IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED);

        try {
            ndefDetected.addDataType("text/plain");
        } catch (IntentFilter.MalformedMimeTypeException e) { }

        exchangeFilters = new IntentFilter[] { ndefDetected };

        nfcAdapter.enableForegroundDispatch(this, pendingIntent, exchangeFilters, null);
    }

    @Override
    protected void onPause() {
        super.onPause();
        nfcAdapter.disableForegroundDispatch(this);
    }

    @Override
    protected void onNewIntent(Intent intent) {

        if (NfcAdapter.ACTION_NDEF_DISCOVERED.equals(intent.getAction())) {
            NdefMessage[] msgs = getNdefMessages(intent);
            detectedTag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
            promptForContent(msgs[0]);
        }

        if (NfcAdapter.ACTION_TAG_DISCOVERED.equals(intent.getAction())) {
            detectedTag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
            writeTag(getMessageAsNdef(mapToString(medicalInfos)));
        }
    }

    private NdefMessage getMessageAsNdef(String message) {
        byte[] textBytes = message.getBytes();

        NdefRecord textRecord = new NdefRecord(NdefRecord.TNF_MIME_MEDIA, "text/plain".getBytes(), null, textBytes);

        return new NdefMessage(new NdefRecord[] { textRecord });
    }

    private NdefMessage[] getNdefMessages(Intent intent) {
        NdefMessage[] msgs = null;
        String action = intent.getAction();

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
            finish();
        }

        return msgs;
    }

    private void promptForContent(final NdefMessage msg) {
        new AlertDialog.Builder(this).setTitle(R.string.app_name).setMessage("Do you really want to replace\n" + new String(msg.getRecords()[0].getPayload()) + " by\n" + mapToString(medicalInfos) + " ?")
                .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        writeTag(getMessageAsNdef(mapToString(medicalInfos)));
                    }
                }).setNegativeButton("No", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {

            }}).show();
    }

    boolean writeTag(NdefMessage message) {
        int size = message.toByteArray().length;

        try {
            Ndef ndef = Ndef.get(detectedTag);

            if (ndef != null) {
                ndef.connect();
                if (!ndef.isWritable()) {
                    error(this, "Tag is read-only.");
                    return false;
                }
                if (ndef.getMaxSize() < size) {
                    error(this, "Tag capacity is " + ndef.getMaxSize() + " bytes, message is " + size + " bytes.");
                    return false;
                }

                ndef.writeNdefMessage(message);
                toast(this, "Message was write successfully.");
                long id = System.currentTimeMillis();
                return true;
            } else {
                NdefFormatable format = NdefFormatable.get(detectedTag);

                if (format != null) {
                    try {
                        format.connect();
                        format.format(message);

                        long id = System.currentTimeMillis();

                        toast(this, "Message was write successfully.");

                        return true;
                    } catch (IOException e) {
                        error(this, "Failed to format tag. " + e.getMessage());
                        return false;
                    }
                } else {
                    error(this, "Tag doesn't support NDEF.");
                    return false;
                }
            }
        } catch (Exception e) {
            error(this, "Failed to write Tag. " + e.getMessage());
        }

        return  false;
    }

    public void toast(Context context, String text) {
        Toast.makeText(context, text, Toast.LENGTH_SHORT).show();
    }

    public static void error(Context context, String text) {
        new AlertDialog.Builder(context).setTitle("Error").setMessage(text).setPositiveButton("OK", null).show();
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

    public void back(View v) {
        finish();
    }
}
