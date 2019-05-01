package com.eipteam.healthsafe.nfc_manager.parser;

import android.nfc.NdefMessage;
import android.nfc.NdefRecord;

import com.eipteam.healthsafe.nfc_manager.record.ParseNdefRecord;
import com.eipteam.healthsafe.nfc_manager.record.SmartPoster;
import com.eipteam.healthsafe.nfc_manager.record.TextRecord;
import com.eipteam.healthsafe.nfc_manager.record.UriRecord;

import java.util.ArrayList;
import java.util.List;

/*
Cette classe parse le tag NFC lu et détermine s'il s'agit d'un type Text, URI,
ou SmartPoster(Text + URI) ou autre chose.
*/

public class NdefMessageParser {

    private NdefMessageParser() {
    }

    public static List<ParseNdefRecord> parse(NdefMessage message) {
        return (getRecords(message.getRecords()));
    }

    public static List<ParseNdefRecord> getRecords(NdefRecord[] records) {
        List<ParseNdefRecord> elements = new ArrayList<ParseNdefRecord>();

        for (final NdefRecord record : records) {
            if (UriRecord.isUri(record))
                elements.add(UriRecord.parse(record));
            else if (TextRecord.isText(record))
                elements.add(TextRecord.parse(record));
            else if (SmartPoster.isPoster(record))
                elements.add(SmartPoster.parse(record));
            else {
                elements.add(new ParseNdefRecord() {
                    @Override
                    public String str() {
                        return (new String(record.getPayload()));
                    }
                });
            }
        }

        return (elements);
    }
}
