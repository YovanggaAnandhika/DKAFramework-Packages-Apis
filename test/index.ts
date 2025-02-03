import * as crypto from 'crypto';

function hash(string: string): string {
    return crypto.createHash('sha256').update(string).digest('hex');
}

// Sample keys I've generated
const privateKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkpAHZxDLIO3XuMJop8C1EjJisxIttzWOfCK3m5AIuhKGGwfEoJlwt0e0B1zRn6mAJalTYaNhTmHlTeApy84v+YKLk6bcdTZxBDQycaTAwolM1qCOh1kD4mr5RFQ2iyrPK8AmZV6K99uKV4FtgMDdvq+IdFDolh8jez+ebA3E1RVe7BgoCP5ckx8dh4OMmYVTkXnudNZ2cnEy4Oh9gmX1P66l0c64QgZoRlg2ug3uSpNybA4DUs96IhIeGicWq3vdtDvDmdDjk06nxJR0ayo/uxitySVVSXtwbnvSczCXSCXZSDKefG7p60Mp3LHGp7PnulckfWKHDtYNPmApQEepbAgMBAAECggEAM6gbxoo3DrkNSuMn86GeamQcoRR31Mc9CxBrk8aVYqgNkBz4v8qtYFj93nZ5xGL2p+2bWl0nBq+P3Z8L1D5S/civQ1iLMiAANy7Tdp3QV2oO5oZvS59QOlA/B2yuHxYvbCx9LoYfEzBLro+6y8bFFf4dj1ch2VWtsi8UMYBWfEpY4Dc+vdB77HPyqaMiZWwltLjrpMSF7dZfsBZ8P5rXTa/qlus75+5/FTGV+XDxb62CbVyXhNUefB1F9gcShri9OeMb4j3ZLgwZ9n9GbBkDpguRAaNrqhIbt7sbL04UNTRtbFo6dJu9qP0b3ZBU2uq3rm6YSXmI2bzCsWJCqMsmKQKBgQDa83UCLDnYs/osjX8Dgk0jpXLTVo0vDh4BTR3Np/txB7qDAc4RpW1fjaKBLThExlFrFOZSTbSm7zkQ5Mdjr+xpEnBzWZCN1YnuiX54G0LI28pltOTYROKlTTitPfn4qJNU/6g70nHLXxV7zLs7Q19Qx/8+6ujo3IvszFWTFJdUQwKBgQDAf+24YvbgNi2sMJtql82DUrIPTWjvaHYlV0z+cwDAYysHE4arSZ1zW+xJ2r2iyvg3RDRKR2uKE344coYv4nfAXQrrRDkQDEci2XVRuQPmSQHFyX0MW1Sp3qety+Dd+J53UNDDFl7lO5TNPcJDE+Kt9fMDvUf42r4KcaTIGxr8CQKBgQCLsE+ydyzgyNKPoiaqwnMcju3XT5z7rHIQOncNQmL1Fg00j+486+H/2IkZCRShLDW9r7PSRqk+59jsokljnFWkI5OCxF2pX9eETExXrGzLYQ6cHPDz2d8Pv1itjqDwt/xnekSHBhh7u8olFdVOVgl1rGN4bL7z8eGDzkm6cKSrqQKBgFE97IsUIVMRKodwYDdFZ/PTk9iHeBEKSkqKJLGCwb9wWvl6kSx7PhswoXGuArjQ5p8UhukOaWF1xqB2HRHah2XFHtWaDmcqd19K3YunBPFMwJXD6qWrafjjQmtED1w/EEoU7nZXW6dtVOil9vWuT83RbkWWvehWETyBJ+VYIzRZAoGBAL/cwHtREhgSx2holAov+WXQJJlagIteCTWgElDhsKgnMLS+s8Kgo+7OL0GJv26rx9y67SqaBGIpyIhxE+QAdMbfFlPBkFP3iR3rtlpvxva+pSPC8EyIfooMcs5VwDOl0KDJkuIGhsimWGII/h55T50A/GJOuCb4w5vmBn/8FnLi';
const path = '/v1.0/hello-world';
const timestamp = '1970-01-01T00:00:00+00:00';
const data = 'POST:' + path + ':' + hash('{"foo":"bar"}') + ':' + timestamp;
console.log("string to sign:", data);

const content = 'POST:/v1.0/qr/apply-ott.htm:5d64eff4f600b8c04ddaa3b11ae4fa4f49eafc9938e6d174e6d2524884fc0e67:2023-12-18T17:37:09+07:00';

const signature = signContent(content, base64KeyToPEM(privateKey, "PRIVATE"), "utf8");

console.log("Signature:", signature);

function signContent(content: string, privateKey: string, encoding: BufferEncoding): string {
    const sign = crypto.createSign("SHA256");
    sign.write(content, encoding);
    sign.end();
    return sign.sign(privateKey, "base64");
}

function verifySignature(content: string, publicKey: string, signature: string, encoding: BufferEncoding): boolean {
    const verify = crypto.createVerify("SHA256");
    verify.write(content, encoding);
    verify.end();
    return verify.verify(publicKey, Buffer.from(signature, "base64"));
}

function base64KeyToPEM(base64Key: string, keyType: string): string {
    return [`-----BEGIN ${keyType} KEY-----`, ...splitStringIntoChunks(base64Key, 64), `-----END ${keyType} KEY-----`].join("\n");
}

function splitStringIntoChunks(input: string, chunkSize: number): string[] {
    const chunkCount = Math.ceil(input.length / chunkSize);
    return Array.from({ length: chunkCount }).map((v, chunkIndex) => input.substr(chunkIndex * chunkSize, chunkSize));
}
