package com.eipteam.healthsafe;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.widget.Toast;

import com.eipteam.healthsafe.nfc_manager.nfc_utils.NfcFunctions;

public class NFCConnect extends Activity {

    private NfcAdapter nfcAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nfc_connect);

        nfcAdapter = NfcAdapter.getDefaultAdapter(this);

        if (nfcAdapter == null) {
            Toast.makeText(this, "No NFC", Toast.LENGTH_SHORT).show();
            finish();
            return ;
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        nfcAdapter = NfcAdapter.getDefaultAdapter(this);

        if (nfcAdapter != null && !nfcAdapter.isEnabled()) {
            showWirelessSettings();
        }

        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, new Intent(this, getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0);

        IntentFilter ndefDetected = new IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED);

        try {
            ndefDetected.addDataType("text/plain");
        } catch (IntentFilter.MalformedMimeTypeException e) { }

        IntentFilter[] exchangeFilters = new IntentFilter[] { ndefDetected };

        nfcAdapter.enableForegroundDispatch(this, pendingIntent, exchangeFilters, null);
    }

    private void showWirelessSettings() {
        Toast.makeText(this, "You need to enable NFC", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(Settings.ACTION_WIRELESS_SETTINGS);
        startActivity(intent);
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (nfcAdapter != null) {
            nfcAdapter.disableForegroundDispatch(this);
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        if (NfcAdapter.ACTION_NDEF_DISCOVERED.equals(intent.getAction())) {
            NdefMessage[] msgs = NfcFunctions.getNdefMessages(intent);

            displayMsgs(msgs[0].getRecords()[0]);
        }
    }

    private void displayMsgs(NdefRecord raw) {
        String msg = new String(raw.getPayload());

        Intent intent = new Intent(this, MedicalStats.class);

        intent.putExtra("data", msg);

        startActivity(intent);
    }

    public void retour(View view)
    {
        finish();
    }
}