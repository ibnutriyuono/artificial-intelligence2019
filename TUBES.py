import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask import request

app = Flask(__name__)


datalatih = pd.read_csv("./data/AI 2019-2020 Dataset Naive Bayes - Sheet1.csv")
dataLatih = datalatih.sort_values("HASIL KEPUTUSAN")
    
jumlahTidak = dataLatih.loc[dataLatih['HASIL KEPUTUSAN'] == "TIDAK"]
jumlahTidak = len(jumlahTidak)

jumlahTunda = dataLatih.loc[dataLatih['HASIL KEPUTUSAN'] == "TUNDA"]
jumlahTunda = len(jumlahTunda)

jumlahYa = dataLatih.loc[dataLatih['HASIL KEPUTUSAN'] == "YA"]
jumlahYa = len(jumlahYa)

jumlahData = jumlahTidak + jumlahTunda + jumlahYa

@app.route("/")
def hello():
    return "Hello, World!"

@app.route('/api/prediksi/', methods=['GET', 'POST'])
def predict():

    def lamaKerja(data) :
        hasil=[]
        for x in data :
            if x < 3 :
                ket = "Kecil"
                hasil.append(ket)
            elif x > 7 :
                ket = "Besar"
                hasil.append(ket)
            else :
                ket = "Menengah"
                hasil.append(ket)
        return hasil  

    def jumlahPekerja(data) :
        hasil=[]
        for x in data :
            if x < 10 :
                ket = "Kecil"
                hasil.append(ket)
            elif x > 20 :
                ket = "Besar"
                hasil.append(ket)
            else :
                ket = "Menengah"
                hasil.append(ket)
        return hasil 

    def omzet(data) :
        hasil=[]
        for x in data :
            if x < 1 :
                ket = "Kecil"
                hasil.append(ket)
            elif x > 3 :
                ket = "Besar"
                hasil.append(ket)
            else :
                ket = "Menengah"
                hasil.append(ket)
        return hasil 

    def jumlahAset(data) :
        hasil=[]
        for x in data :
            if x < 5 :
                ket = "Kecil"
                hasil.append(ket)
            elif x > 7 :
                ket = "Besar"
                hasil.append(ket)
            else :
                ket = "Menengah"
                hasil.append(ket)
        return hasil

    arr = dataLatih['LAMA USAHA(dlm tahun)'].to_numpy()
    LK = lamaKerja(arr)

    arr2 = dataLatih['JUMLAH PEKERJA'].to_numpy()
    JP = jumlahPekerja(arr2)# In[14]:

    arr3 = dataLatih['OMZET (dlm juta)'].to_numpy()
    Oz = omzet(arr3)

    arr4 = dataLatih['JUMLAH ASET'].to_numpy()
    JA = jumlahAset(arr4)

    HK = dataLatih['HASIL KEPUTUSAN'].to_numpy()
    def jmlLK(data) :
        Tidak_kecil = 0
        Tidak_menengah = 0
        Tidak_besar = 0
        Tunda_kecil = 0
        Tunda_menengah = 0
        Tunda_Besar = 0
        Ya_kecil = 0
        Ya_menengah = 0
        Ya_Besar = 0
        index = 0
        for x in data :
            if x == "Kecil" and HK[index] == "TIDAK" :
                Tidak_kecil += 1
            elif x == "Menengah" and HK[index] == "TIDAK" :
                Tidak_menengah += 1
            elif x == "Besar" and HK[index] == "TIDAK":
                Tidak_besar += 1
            elif x == "Kecil" and HK[index] == "TUNDA" :
                Tunda_kecil += 1
            elif x == "Menengah" and HK[index] == "TUNDA" :
                Tunda_menengah += 1
            elif x == "Besar" and HK[index] == "TUNDA":
                Tunda_Besar += 1
            elif x == "Kecil" and HK[index] == "YA" :
                Ya_kecil += 1
            elif x == "Menengah" and HK[index] == "YA" :
                Ya_menengah += 1
            elif x == "Besar" and HK[index] == "YA":
                Ya_Besar += 1
            index += 1
        return Tidak_kecil, Tidak_menengah, Tidak_besar, Tunda_kecil, Tunda_menengah, Tunda_Besar, Ya_kecil, Ya_menengah, Ya_Besar

    LK_k_tdk, LK_m_tdk, LK_b_tdk, LK_k_tu, LK_m_tu, LK_b_tu, LK_k_ya, LK_m_ya, LK_b_ya = jmlLK(LK)
    JP_k_tdk, JP_m_tdk, JP_b_tdk, JP_k_tu, JP_m_tu, JP_b_tu, JP_k_ya, JP_m_ya, JP_b_ya = jmlLK(JP)
    OZ_k_tdk, OZ_m_tdk, OZ_b_tdk, OZ_k_tu, OZ_m_tu, OZ_b_tu, OZ_k_ya, OZ_m_ya, OZ_b_ya = jmlLK(Oz)
    JA_k_tdk, JA_m_tdk, JA_b_tdk, JA_k_tu, JA_m_tu, JA_b_tu, JA_k_ya, JA_m_ya, JA_b_ya = jmlLK(JA)

    def P_LK(lk) :
        if lk == "Kecil" :
            tdk_lk = LK_k_tdk
            tu_lk = LK_k_tu
            ya_lk = LK_k_ya
        elif lk == "Menengah" :
            tdk_lk = LK_m_tdk
            tu_lk = LK_m_tu
            ya_lk = LK_m_ya
        else :
            tdk_lk = LK_b_tdk
            tu_lk = LK_b_tu
            ya_lk = LK_b_ya
        return tdk_lk,tu_lk,ya_lk    

    def P_jp(jp) :
        if jp == "Kecil" :
            tdk_jp = JP_k_tdk
            tu_jp = JP_k_tu
            ya_jp = JP_k_ya
        elif jp == "Menengah" :
            tdk_jp = JP_m_tdk
            tu_jp = JP_m_tu
            ya_jp = JP_m_ya
        else :
            tdk_jp = JP_b_tdk
            tu_jp = JP_b_tu
            ya_jp = JP_b_ya
        return tdk_jp,tu_jp,ya_jp  

    def P_oz(oz) :
        if oz == "Kecil" :
            tdk_oz = OZ_k_tdk
            tu_oz = OZ_k_tu
            ya_oz = OZ_k_ya
        elif oz == "Menengah" :
            tdk_oz = OZ_m_tdk
            tu_oz = OZ_m_tu
            ya_oz = OZ_m_ya
        else :
            tdk_oz = OZ_b_tdk
            tu_oz = OZ_b_tu
            ya_oz = OZ_b_ya
        return tdk_oz,tu_oz,ya_oz    

    def P_ja(ja) :
        if ja == "Kecil" :
            tdk_ja = JA_k_tdk
            tu_ja = JA_k_tu
            ya_ja = JA_k_ya
        elif ja == "Menengah" :
            tdk_ja = JA_m_tdk
            tu_ja = JA_m_tu
            ya_ja = JA_m_ya
        else :
            tdk_ja = JA_b_tdk
            tu_ja = JA_b_tu
            ya_ja = JA_b_ya
        return tdk_ja,tu_ja,ya_ja 

    def naiveBayes(nama,lk,jp,oz,ja) :
        lk2 = lamaKerja([lk])
        jp2 = jumlahPekerja([jp])
        oz2 = omzet([oz])
        ja2 = jumlahAset([ja])
        tdk_lk,tu_lk,ya_lk = P_LK(lk2[0])
        tdk_jp,tu_jp,ya_jp = P_jp(jp2[0])  
        tdk_oz,tu_oz,ya_oz = P_oz(oz2[0])   
        tdk_ja,tu_ja,ya_ja = P_ja(ja2[0])   
        P_LK_TIDAK = (tdk_lk/jumlahData)/(jumlahTidak/jumlahData)
        P_LK_TUNDA = (tu_lk/jumlahData)/(jumlahTunda/jumlahData)
        P_LK_YA = (ya_lk/jumlahData)/(jumlahYa/jumlahData)
        P_JP_TIDAK = (tdk_jp/jumlahData)/(jumlahTidak/jumlahData)
        P_JP_TUNDA = (tu_jp/jumlahData)/(jumlahTunda/jumlahData)
        P_JP_YA = (ya_jp/jumlahData)/(jumlahYa/jumlahData)
        P_OZ_TIDAK = (tdk_oz/jumlahData)/(jumlahTidak/jumlahData)
        P_OZ_TUNDA = (tu_oz/jumlahData)/(jumlahTunda/jumlahData)
        P_OZ_YA = (ya_oz/jumlahData)/(jumlahYa/jumlahData)
        P_JA_TIDAK = (tdk_ja/jumlahData)/(jumlahTidak/jumlahData)
        P_JA_TUNDA = (tu_ja/jumlahData)/(jumlahTunda/jumlahData)
        P_JA_YA = (ya_ja/jumlahData)/(jumlahYa/jumlahData)
        

        P_TIDAK = P_LK_TIDAK*P_JP_TIDAK*P_OZ_TIDAK*P_JA_TIDAK*(jumlahTidak/jumlahData)
        P_TUNDA = P_LK_TUNDA*P_JP_TUNDA*P_OZ_TUNDA*P_JA_TUNDA*(jumlahTunda/jumlahData)
        P_YA = P_LK_YA*P_JP_YA*P_OZ_YA*P_JA_YA*(jumlahYa/jumlahData)
        
        maxP = max(P_TIDAK,P_TUNDA,P_YA)
        if maxP == P_TIDAK :
            ket = "Tidak"
        elif maxP == P_TUNDA :
            ket = "Tunda"
        else :
            ket = "Ya"
        return nama, ket

    # content = request.json
    # prediksi = naiveBayes(request.args.get('namaukm'),request.args.get('lamakerja'),request.args.get('jumlahpekerja'),request.args.get('omzet'),request.args.get('jumlahaset'))
    prediksi = naiveBayes(request.args.get('namaukm'),int(request.args.get('lamakerja')),int(request.args.get('jumlahpekerja')),int(request.args.get('omzet')),int(request.args.get('jumlahaset')))
    # print(content['test'])
    print(prediksi)
    return jsonify({"Hasil":prediksi, "Arga":request.args})

@app.route('/api/data/', methods=['GET', 'POST'])
def getdata():
    print(datalatih.values)
    return jsonify({"Data":"EPIC"})
if __name__ == '__main__':
    app.run(debug=True)